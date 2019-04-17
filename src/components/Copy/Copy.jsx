import React, { Component, Fragment, Children } from 'react';
import { Button, Icon, Input } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QueueAnim from 'rc-queue-anim';
import t from 'prop-types';
import './Copy.scss';

class Copy extends Component {
  state = {
    copied: false,
    preCombatant: false,
    inputValue: '',
  };

  componentDidMount() {
    if (this.props.value) {
      this.setState({
        inputValue: this.props.value,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.value && JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.setState({
        inputValue: nextProps.value,
      });
    }
  }

  onCopy = () => {
    const { copied, preCombatant } = this.state;
    if (preCombatant) return;
    this.setState(
      {
        copied: true,
      },
      () => {
        setTimeout(() => {
          this.setState({
            copied: false,
          });
        }, 1500);
      },
    );
  };

  handleCombatant = ({ type }) => {
    if (type === 'enter') {
      this.setState({
        preCombatant: true,
      });
    } else {
      this.setState({
        preCombatant: false,
      });
    }
  };

  createContent = () => {
    const { type, label } = this.props;
    return type === 'text' ? <span>{label}</span> : <Icon className="iconSize" type="copy" />;
  };

  renderCopy = () => {
    const { label, text, type, withInput, children, tipsIcon = {}, ...args } = this.props;
    const { copied, inputValue } = this.state;

    const computedIsInput = () => {
      if (withInput) {
        return !!inputValue;
      } else {
        return !!text;
      }
    };
    return (
      <CopyToClipboard text={withInput ? inputValue : text} onCopy={this.onCopy} {...args}>
        <button
          disabled={!computedIsInput()}
          className={`copyBtn ${type === 'text' ? 'minWidth' : null} ${
            !computedIsInput() ? 'disabled' : ''
          } ${withInput ? 'inputCopyBtn' : null}`}
          size="small"
        >
          <QueueAnim component="div" type={['top', 'bottom']} onEnd={this.handleCombatant}>
            {copied ? (
              <div key="1" className="copyIcon">
                <Icon
                  className="iconSize"
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#1badff"
                  {...tipsIcon}
                />
                {type === 'text' ? <span className="tips">已复制</span> : null}
              </div>
            ) : null}
          </QueueAnim>
          {this.createContent()}
        </button>
      </CopyToClipboard>
    );
  };

  handleInput = (e) => {
    const { onChange } = this.props;
    this.setState({ inputValue: e.target.value });
    if (onChange) {
      onChange(e.target.value);
    }
  };

  renderInputCopy = () => {
    const { inputValue } = this.state;
    return <Input value={inputValue} onChange={this.handleInput} addonAfter={this.renderCopy()} />;
  };

  render() {
    const { withInput } = this.props;
    return withInput ? this.renderInputCopy() : this.renderCopy();
  }
}

export default Copy;

Copy.propTypes = {
  /**
        需要复制到粘贴板的数据
    */
  value: t.string,
  /**
        复制按钮类型 text | icon 
    */
  type: t.oneOf(['text', 'icon']),
  /**
        复制按钮文案
    */
  label: t.string,
  /**
        复制成功图标配置, API 同 antd Icon 组件, eg: { type: 'copy', theme: 'outlined', spin: false... }
    */
  tipsIcon: t.object,
  /**
        与 Input 绑定, 支持 antd form 包裹
    */
  withInput: t.bool,
};

Copy.defaultProps = {
  withInput: false,
  type: 'text',
  label: '复制到粘贴板',
};
