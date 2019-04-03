import React, { Component, Fragment } from 'react';
import { Input, Form } from 'antd';
import t from 'prop-types';
import './CountInput.scss';

const { TextArea } = Input;

export class CountInput extends Component {
  state = {
    currentCounts: 0,
    _value: '',
    contentPaddingW: 0,
    contentPaddingH: 0,
  };

  componentDidMount() {
    this.setState({
      contentPaddingW: this.computePaddingW(this.counts),
      contentPaddingH: this.computePaddingH(this.counts),
      _value: this.props.value,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.setState({
        _value: nextProps.value,
      });
    }
  }

  computePaddingW = (el) => {
    const parentW = el.offsetParent.offsetWidth;
    const elW = el.offsetWidth;
    const elL = el.offsetLeft;
    return parentW - elW - elL + elW + 20;
  };

  computePaddingH = (el) => el.offsetHeight + 10;

  inputChange = (e) => {
    const len = e.target.value.length;
    const { onChange, value, count = 20 } = this.props;
    if (len > count) return;
    this.setState({
      currentCounts: len,
      _value: e.target.value,
    });
    if (onChange) {
      onChange(e.target.value);
    }
  };

  createInput = () => {
    const { count, type, onChange, ...args } = this.props;
    const { currentCounts, contentPaddingW, _value } = this.state;

    return (
      <Fragment>
        <Input
          className="forestInput"
          style={{ paddingRight: contentPaddingW }}
          value={_value}
          onChange={this.inputChange}
          {...args}
        />
        <div
          ref={(el) => (this.counts = el)}
          className={`counts ${type === 'input' ? `input` : `textarea`}`}
        >
          <span>{currentCounts}</span>
          <span>/{count}</span>
        </div>
      </Fragment>
    );
  };

  createTextarea = () => {
    const { count, value, type, onChange, ...args } = this.props;
    const { currentCounts, contentPaddingH, _value } = this.state;
    return (
      <div className="textareaContainer">
        <TextArea
          className="textareael"
          value={_value}
          onChange={this.inputChange}
          autosize
          style={{ paddingBottom: contentPaddingH }}
          {...args}
        />
        <div
          ref={(el) => (this.counts = el)}
          className={`counts ${type === 'input' ? `input` : `textarea`}`}
        >
          <span>{currentCounts}</span>
          <span>/{count}</span>
        </div>
      </div>
    );
  };

  render() {
    const { type } = this.props;
    return (
      <div className="countInput">
        {type === 'input' ? this.createInput() : this.createTextarea()}
      </div>
    );
  }
}

CountInput.propTypes = {
  count: t.number,
  type: t.oneOf(['input', 'textarea']),
};

CountInput.defaultProps = {
  count: 20,
  type: 'input',
};

class Container extends Component {
  render() {
    const { form } = this.props;
    return (
      <Form>
        <Form.Item label="表单测试">
          {form.getFieldDecorator('text', {
            initialValue: '',
            rules: [
              {
                max: 20,
                message: '最多支持20个字符',
              },
              {
                required: true,
                message: '必填',
              },
            ],
          })(<CountInput type="input" count={20} />)}
        </Form.Item>
      </Form>
    );
  }
}

export const FormCountInput = Form.create()(Container);
