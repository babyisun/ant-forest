import React, { Component } from 'react';
import { Radio, Checkbox } from 'antd';
import t from 'prop-types';
import './Filter.scss';

class Filter extends Component {
  state = {
    checkedList: this.props.defaultList,
    indeterminate: !(this.props.list.length === this.props.defaultList.length),
    checkAll: this.props.object
      ? Object.getOwnPropertyNames(this.props.list).length === this.props.defaultList.length
      : this.props.list.length === this.props.defaultList.length,
  };

  onCheckAllChange = (e) => {
    this.setState(
      {
        checkedList: e.target.checked
          ? this.props.object
            ? Object.entries(this.props.list).map(([k, v]) => v)
            : this.props.list
          : [],
        indeterminate: false,
        checkAll: e.target.checked,
      },
      () => {
        this.triggerChange(this.state.checkedList);
      },
    );
  };

  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: this.props.object
        ? !!checkedList.length &&
          checkedList.length < Object.getOwnPropertyNames(this.props.list).length
        : !!checkedList.length && checkedList.length < this.props.list.length,
      checkAll: this.props.object
        ? checkedList.length === Object.getOwnPropertyNames(this.props.list).length
        : checkedList.length === this.props.list.length,
    });
    this.triggerChange(checkedList);
  };

  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    return this.props.multiple ? (
      <div>
        <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.state.checkAll}
        >
          全部
        </Checkbox>
        <Checkbox.Group
          options={Object.entries(this.props.list).map(([k, v]) => v)}
          onChange={this.onChange}
          value={this.state.checkedList}
        />
      </div>
    ) : this.props.object ? (
      <Radio.Group defaultValue="-1" onChange={this.onChange} className="radioGroup">
        <Radio.Button value="-1" className="radioButton">
          全部
        </Radio.Button>
        {Object.entries(this.props.list).map(([k, v]) => (
          <Radio.Button key={k} value={+k} className="radioButton">
            {v}
          </Radio.Button>
        ))}
      </Radio.Group>
    ) : (
      <Radio.Group defaultValue="-1" onChange={this.onChange} className="radioGroup">
        <Radio.Button value="-1" className="radioButton">
          全部
        </Radio.Button>
        {this.props.list.map((item) => (
          <Radio.Button value={item} key={item} className="radioButton">
            {item}
          </Radio.Button>
        ))}
      </Radio.Group>
    );
  }
}
export default Filter;
Filter.propTypes = {
  list: t.oneOf([Object, Array]),
  defaultList: t.oneOf([Object, Array]),
  multiple: t.oneOf([true, false]),
  object: t.oneOf([true, false]),
};
Filter.defaultProps = {
  list: Array,
  defaultList: Array,
  multiple: false,
  object: false,
};
