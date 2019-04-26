import React, { Component } from 'react';
import { Radio, Checkbox } from 'antd';
import t from 'prop-types';
// import style from './Filter.scss';
import style from './Filter.less';
import { getPrefixCls } from '../../utils/classname';

const { Group: RG, Button: RB } = Radio;
const { Group: CG } = Checkbox;

class Filter extends Component {
  constructor(props) {
    super(props);
    const { defaultValue, value, options, multiple } = props;
    const v = defaultValue || value;
    this.state = {
      checkedList: v,
      indeterminate: multiple && v ? !(options.length === v.length) : false,
      checkAll: v ? options.length === v.length : true, //默认选中全部
    };
  }

  static propTypes = {
    /**
     * 数据格式 [{ lable: '分类1', value: '1' }]
     */
    options: t.array.isRequired,
    /**
     * 设置单选或多选状态, 默认为false, 即单选
     */
    multiple: t.bool,
    /**
     * 初始选中的默认值，如：单选为Number|String类型："1"，多选为Array类型：[1, 2, 3]
     */
    defaultValue: t.oneOfType([t.number, t.string, t.array]),
    /**
     * 是否需要屏蔽全部选项，默认为false，即展示全部
     */
    disabledAll: t.bool,
    /**
     * 当选项变化时的回调函数 (value)=>{}
     */
    onChange: t.func,
  };

  static defaultProps = {
    multiple: false,
    disabledAll: false,
  };

  onCheckAllChange = (e) => {
    const { options } = this.props;
    const { checkedList } = this.state;
    const value = e.target.checked ? options.map((item) => item.value) : [];
    this.setState(
      {
        checkedList: value,
        indeterminate: false,
        checkAll: e.target.checked,
      },
      () => this.triggerChange(value),
    );
  };

  onCheckBoxChange = (checkedList) => {
    const { options } = this.props;
    this.setState(
      {
        checkedList,
        indeterminate: !!checkedList.length && checkedList.length < options.length,
        checkAll: checkedList.length === options.length,
      },
      () => this.triggerChange(checkedList),
    );
  };

  onRadioChange = (e) => {
    // const { options } = this.props;
    this.triggerChange(e.target.value);
    // this.setState(
    //   {
    //     checkedList: e.target.value,
    //   },
    //   () => this.triggerChange(e.target.value),
    // );
  };

  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { checkAll, checkedList, indeterminate } = this.state;
    const { multiple, options, disabledAll, defaultValue, value } = this.props;
    // console.log(this.props, 979) <div className={`${style.prefixCls}-filter`}>
    return (
      <div className={getPrefixCls('filter')}>
        {/* <div className={`${style.prefixCls}-filter`}> */}
        {multiple ? (
          <>
            {!disabledAll && (
              <Checkbox
                indeterminate={indeterminate}
                onChange={this.onCheckAllChange}
                checked={checkAll}
              >
                全部
              </Checkbox>
            )}
            <CG options={options} onChange={this.onCheckBoxChange} value={checkedList} />
          </>
        ) : (
          <RG onChange={this.onRadioChange} defaultValue={defaultValue || value}>
            {!disabledAll && <RB>全部</RB>}
            {options.map((item, i) => (
              <RB key={item.value} value={item.value}>
                {item.label}
              </RB>
            ))}
          </RG>
        )}
      </div>
    );
  }
}
export default Filter;
