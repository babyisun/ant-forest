import React, { Component } from 'react';
import { Radio, Checkbox } from 'antd';
import t from 'prop-types';
import style from './Filter.scss';

const { Group: RG, Button: RB } = Radio;
const { Group: CG } = Checkbox;

class Filter extends Component {
  constructor(props) {
    super(props);
    const { defaultValue, options } = props;
    this.state = {
      checkedList: defaultValue,
      // indeterminate: !(options.length === defaultValue.length),
      checkAll: defaultValue ? options.length === defaultValue.length : true, //默认选中全部
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

  /* state = () => {
    const { defaultValue, options } = this.props;
    return {
      checkedList: defaultValue,
      // indeterminate: !(options.length === defaultValue.length),
      checkAll: defaultValue ? options.length === defaultValue.length : true, //默认选中全部
    };
  }; */

  onCheckAllChange = (e) => {
    const { options } = this.props;
    const { checkedList } = this.state;
    this.setState(
      {
        checkedList: e.target.checked ? options.map((item) => item.value) : [],
        indeterminate: false,
        checkAll: e.target.checked,
      },
      () => this.triggerChange(checkedList),
    );
  };

  onChange = (checkedList) => {
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

  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { checkAll, checkedList, indeterminate } = this.state;
    const { multiple, options } = this.props;
    return (
      <div className={style.filter}>
        {multiple ? (
          <>
            <Checkbox
              indeterminate={indeterminate}
              onChange={this.onCheckAllChange}
              checked={checkAll}
            >
              全部
            </Checkbox>
            <CG options={options} onChange={this.onChange} value={checkedList} />
          </>
        ) : (
          <RG onChange={this.onChange}>
            <RB>全部</RB>
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
