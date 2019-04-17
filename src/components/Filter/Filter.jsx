import React, { Component } from 'react';
import { Radio, Checkbox } from 'antd';
import t from 'prop-types';
import style from './Filter.scss';

const { Group: RG, Button: RB } = Radio;
const { Group: CG } = Checkbox;

class Filter extends Component {
  static propTypes = {
    /**
     * 数据格式 [{ lable: '分类1', value: '1' }]
     */
    options: t.object.isRequired,
    /**
     * 设置单选或多选状态, 默认为false, 即单选
     */
    multiple: t.bool,
    /**
     * 初始选中的数据，如[1, 2, 3]
     */
    defaultValue: t.array,
    /**
     * 是否需要屏蔽全部选项，默认为false，即展示全部
     */
    disabledAll: t.bool,
    /**
     * 当选项变化时的回调函数 (value, option: Array<Option>)=>{}
     */
    onChange: t.func,
  };

  static defaultProps = {
    multiple: false,
    disabledAll: false,
  };

  state = () => {
    const { defaultValue, options } = this.props;
    return {
      checkedList: defaultValue,
      // indeterminate: !(options.length === defaultValue.length),
      checkAll: defaultValue ? options.length === defaultValue.length : true, //默认选中全部
    };
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
    const { options } = this.props;
    this.setState({
      checkedList,
      // indeterminate:
      //   Object.prototype.toString.call(this.props.list) === '[object Object]'
      //     ? !!checkedList.length &&
      //       checkedList.length < Object.getOwnPropertyNames(this.props.list).length
      //     : !!checkedList.length && checkedList.length < this.props.list.length,
      checkAll: checkedList.length === options.length,
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
    const { checkAll } = this.state;
    const { options } = this.props;
    return (
      <div className={style.filter}>
        {this.props.multiple ? (
          <>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllChange}
              checked={checkAll}
            >
              全部
            </Checkbox>
            <CG options={options} onChange={this.onChange} value={this.state.checkedList} />
          </>
        ) : (
          <RG onChange={this.onChange} className="radioGroup">
            <RB className="radioButton">全部</RB>
            {Object.entries(this.props.list).map(([k, v]) => (
              <RB key={k} value={+k} className="radioButton">
                {v}
              </RB>
            ))}
          </RG>
        )}
      </div>
    );
  }
}
export default Filter;
