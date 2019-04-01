import React, { Component } from 'react';
import { Radio, Checkbox } from 'antd';
import './Filter.scss';

class Filter extends Component {
  state = {
    checkedList: this.props.defaultList,
    indeterminate: !(this.props.shelfList.length === this.props.defaultList.length),
    checkAll: this.props.shelfList.length === this.props.defaultList.length,
  };

  onCheckAllChange = (e) => {
    this.setState(
      {
        checkedList: e.target.checked ? this.props.shelfList : [],
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
      indeterminate: !!checkedList.length && checkedList.length < this.props.shelfList.length,
      checkAll: checkedList.length === this.props.shelfList.length,
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
          options={this.props.shelfList}
          onChange={this.onChange}
          value={this.state.checkedList}
        />
      </div>
    ) : (
      <Radio.Group defaultValue="-1" onChange={this.onChange} className="radioGroup">
        <Radio.Button value="-1" className="radioButton">
          全部
        </Radio.Button>
        {this.props.shelfList.map((item) => (
          <Radio.Button value={item} key={item} className="radioButton">
            {item}
          </Radio.Button>
        ))}
        {/* {Object.entries(this.props.shelfList).map(([k, v]) => (
        <Radio.Button key={k} value={+k} className="radioButton">
          {v}
        </Radio.Button>
       ))}       shelfList是对象的情况下 */}
      </Radio.Group>
    );
  }
}
export default Filter;
