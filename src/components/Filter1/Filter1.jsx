import React, { Component } from 'react';
import { Radio, Checkbox } from 'antd';
import t from 'prop-types';
import './filter.scss';

class Filter extends Component {
  state = {
    checkedList: this.props.defaultList,
    indeterminate: !(this.props.list.length === this.props.defaultList.length),
    checkAll:
      Object.prototype.toString.call(this.props.list) === '[object Object]'
        ? Object.getOwnPropertyNames(this.props.list).length === this.props.defaultList.length
        : this.props.list.length === this.props.defaultList.length,
  };

  onCheckAllChange = (e) => {
    this.setState(
      {
        checkedList: e.target.checked
          ? Object.prototype.toString.call(this.props.list) === '[object Object]'
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
      indeterminate:
        Object.prototype.toString.call(this.props.list) === '[object Object]'
          ? !!checkedList.length &&
            checkedList.length < Object.getOwnPropertyNames(this.props.list).length
          : !!checkedList.length && checkedList.length < this.props.list.length,
      checkAll:
        Object.prototype.toString.call(this.props.list) === '[object Object]'
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
    ) : Object.prototype.toString.call(this.props.list) === '[object Object]' ? (
      <Radio.Group onChange={this.onChange} className="radioGroup">
        <Radio.Button className="radioButton">全部</Radio.Button>
        {Object.entries(this.props.list).map(([k, v]) => (
          <Radio.Button key={k} value={+k} className="radioButton">
            {v}
          </Radio.Button>
        ))}
      </Radio.Group>
    ) : (
      <Radio.Group
        defaultValue={this.props.defaultList}
        onChange={this.onChange}
        className="radioGroup"
      >
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
  /**
   * 数据格式 Object | Array
   */
  list: t.oneOf([Object, Array]),
  /**
   * 设置单选或多选状态 false | true
   */
  multiple: t.bool,
  /**
   * 初始选中的数据，单选状态数据格式为String，多选状态为Array
   */
  defaultList: t.oneOf([String, Array]),
};
Filter.defaultProps = {
  list: Array,
  multiple: false,
  defaultList: Array,
};
