import React, { Component } from 'react';
import { Tabs, Radio, Card, Input, Icon } from 'antd';
import citys from './city';
import t from 'prop-types';
import './address.scss';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

class Address extends Component {
  constructor(props) {
    super(props);
    this.textDiv = React.createRef();
    this.state = {
      options: {},
      names: {},
      activeKey: '1',
      spanKey: '',
      tabHide: false,
      provinceAG: [],
      provinceHK: [],
      provinceLS: [],
      provinceTZ: [],
      selectCity: [],
      selectTown: [],
      selectedAddress: '',
      selectedAddressValue: [],
      selectedPro: '',
      selectedCity: '',
      selectedTown: '',
      proValue: '',
      cityValue: '',
      townValue: '',
      iconHide: false,
      propsValue: false,
      radioDis: false,
    };
  }

  componentDidMount() {
    const { defaultValue, value, fieldNames = {}, options = citys } = this.props;
    const uuidv1 = require('uuid/v1');
    const names = {
      children: fieldNames.children || 'children',
      label: fieldNames.label || 'label',
      value: fieldNames.value || 'value',
    };
    let isAG = [];
    let isHK = [];
    let isLS = [];
    let isTZ = [];
    options.forEach((item) => {
      if (item.initial >= 'A' && item.initial <= 'G') {
        isAG.push({ value: item[names.value], label: item[names.label], disabled: item.disabled });
      } else if (item.initial >= 'H' && item.initial <= 'K') {
        isHK.push({ value: item[names.value], label: item[names.label], disabled: item.disabled });
      } else if (item.initial >= 'L' && item.initial <= 'S') {
        isLS.push({ value: item[names.value], label: item[names.label], disabled: item.disabled });
      } else {
        isTZ.push({ value: item[names.value], label: item[names.label], disabled: item.disabled });
      }
    });
    this.setState({
      options,
      names,
      provinceAG: isAG,
      provinceHK: isHK,
      provinceLS: isLS,
      provinceTZ: isTZ,
      spanKey: uuidv1(),
    });
    document.addEventListener('click', this.globalFun);
    if (defaultValue && defaultValue.length) {
      this.showDefaultValue(defaultValue, names);
    }
    if (value && value.length) {
      this.showDefaultValue(value, names);
      this.setState({
        propsValue: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    const { names } = this.state;
    if (value && value.length && value !== nextProps.value) {
      this.showDefaultValue(value, names);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.globalFun);
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedAddress } = this.state;
    if (selectedAddress !== prevState.selectedAddress) {
      this.textDiv.current.props.onChange();
    }
  }

  globalFun = (e) => {
    if (e.target.id !== this.textDiv.current.props.id) {
      this.setState({
        tabHide: false,
      });
    }
  };

  changePane = (key) => {
    this.setState({
      activeKey: key,
    });
  };

  changeRadioProvince = (e) => {
    const { changeOnSelect } = this.props;
    const { names, options } = this.state;
    const city = this.selectAddress(options, e.target.value);
    this.setState({
      proValue: e.target.value,
      cityValue: '',
      selectCity: city[names.children],
      selectedPro: city[names.label],
      selectTown: [],
      activeKey: '2',
    });
    if (changeOnSelect) {
      this.setState({
        selectedAddress: city[names.label],
        selectedAddressValue: [city[names.value]],
      });
    }
  };

  changeRadioCity = (e) => {
    const { changeOnSelect } = this.props;
    const { selectCity, selectedPro, proValue, names } = this.state;
    const town = this.selectAddress(selectCity, e.target.value);

    if (town[names.children].length) {
      this.setState({
        cityValue: e.target.value,
        townValue: '',
        selectTown: town[names.children],
        selectedCity: town[names.label],
        radioDis: false,
        activeKey: '3',
      });
    } else {
      this.setState({
        cityValue: e.target.value,
        townValue: '',
        selectedCity: town[names.label],
        radioDis: true,
        selectedAddress: `${selectedPro} / ${town[names.label]}`,
        selectedAddressValue: [proValue, town[names.value]],
        tabHide: false,
      });
    }
    if (changeOnSelect) {
      this.setState({
        selectedAddress: `${selectedPro} / ${town[names.label]}`,
        selectedAddressValue: [proValue, town[names.value]],
      });
    }
  };

  changeRadioTown = (e) => {
    const { selectTown, selectedPro, selectedCity, proValue, cityValue, names } = this.state;
    const selectedTown = this.selectAddress(selectTown, e.target.value);
    this.setState({
      townValue: e.target.value,
      selectedTown,
      selectedAddress: `${selectedPro} / ${selectedCity} / ${selectedTown[names.label]}`,
      selectedAddressValue: [proValue, cityValue, e.target.value],
      tabHide: false,
    });
  };

  inputClick = () => {
    const { changeOnSelect } = this.props;
    const { selectedAddressValue, names, tabHide } = this.state;
    const toggleTabHide = !tabHide;
    if (!changeOnSelect && toggleTabHide && selectedAddressValue.length) {
      this.showDefaultValue(selectedAddressValue, names);
    }
    if (!changeOnSelect && !selectedAddressValue.length) {
      this.setState({
        activeKey: '1',
        proValue: '',
        cityValue: '',
        townValue: '',
        selectCity: [],
        selectTown: [],
      });
    }
    if (changeOnSelect && selectedAddressValue.length && selectedAddressValue.length < 3) {
      this.setState({
        activeKey: selectedAddressValue.length.toString(),
      });
    }
    this.setState({
      tabHide: toggleTabHide,
    });
  };

  changeInput = () => {
    const { selectedAddressValue } = this.state;
    const { onChange } = this.props;
    if (onChange) {
      onChange(selectedAddressValue);
    }
  };

  iconClick = (e) => {
    e.stopPropagation();
    this.setState({
      selectedAddress: '',
      selectedAddressValue: [],
      activeKey: '1',
      proValue: '',
      cityValue: '',
      townValue: '',
      selectCity: [],
      selectTown: [],
      iconHide: false,
    });
  };

  mouseEnter = () => {
    const { selectedAddress } = this.state;
    if (selectedAddress) {
      this.setState({
        iconHide: true,
      });
    }
  };

  mouseLeave = () => {
    const { iconHide } = this.state;
    if (iconHide) {
      this.setState({
        iconHide: false,
      });
    }
  };

  showDefaultValue = (defaultValue, names) => {
    const { options = citys } = this.props;
    let province, city, town, selectedAddress;
    if (defaultValue.length < 4) {
      province = this.selectAddress(options, defaultValue[0], names);
      if (province) {
        selectedAddress = province[names.label];
        this.setState({
          selectedAddress,
          selectedAddressValue: [province[names.value]],
          selectCity: province[names.children],
          proValue: province[names.value],
          selectedPro: province[names.label],
        });
        city = this.selectAddress(province[names.children], defaultValue[1], names);
        if (city) {
          selectedAddress += ` / ${city[names.label]}`;
          this.setState({
            selectedAddress,
            selectedAddressValue: [province[names.value], city[names.value]],
            selectTown: city[names.children],
            cityValue: city[names.value],
            selectedCity: city[names.label],
            activeKey: '2',
          });
          if (city[names.children] && !city[names.children].length) {
            this.setState({
              radioDis: true,
            });
          } else {
            town = this.selectAddress(city[names.children], defaultValue[2], names);
            if (town) {
              selectedAddress += ` / ${town[names.label]}`;
              this.setState({
                selectedAddress,
                selectedAddressValue: [province[names.value], city[names.value], town[names.value]],
                townValue: town[names.value],
                activeKey: '3',
              });
            }
          }
        }
      }
    }
  };

  selectAddress = (data, condition, n = this.state.names) => {
    const selData = data.find((item) => item[n.value] === condition);
    return selData;
  };

  render() {
    const {
      activeKey,
      tabHide,
      provinceAG,
      provinceHK,
      provinceLS,
      provinceTZ,
      selectCity,
      selectTown,
      selectedAddress,
      proValue,
      cityValue,
      townValue,
      iconHide,
      spanKey,
      propsValue,
      radioDis,
      names,
    } = this.state;
    const { placeholder, allowClear = true, className } = this.props;
    return (
      <div>
        <div
          onClick={(e) => this.inputClick(e)}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          className="address-select"
        >
          <Input
            id={spanKey}
            style={{ cursor: 'pointer' }}
            className={className}
            onChange={this.changeInput}
            ref={this.textDiv}
            readOnly
            value={selectedAddress}
            placeholder={placeholder ? placeholder : 'Please select'}
          />
          {allowClear && iconHide ? (
            <Icon
              className="address-select-icon"
              type="close-circle"
              theme="filled"
              onClick={(e) => this.iconClick(e)}
            />
          ) : (
            ''
          )}
        </div>
        <div
          className={tabHide ? 'address-tabs-container' : 'tab-hide'}
          onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
        >
          <Tabs activeKey={activeKey} onChange={this.changePane}>
            <TabPane tab="省份" key="1">
              <div onFocusCapture={propsValue ? null : this.changeRadioProvince}>
                <RadioGroup
                  buttonStyle="solid"
                  size="small"
                  // onChange={this.changeRadioProvince}
                  value={proValue}
                >
                  {provinceAG && provinceAG.length ? (
                    <Card title="A-G" bordered={false}>
                      {provinceAG.map((item) => (
                        <Radio.Button value={item.value} disabled={item.disabled} key={item.value}>
                          {item.label}
                        </Radio.Button>
                      ))}
                    </Card>
                  ) : null}
                  {provinceHK && provinceHK.length ? (
                    <Card title="H-K" bordered={false}>
                      {provinceHK.map((item) => (
                        <Radio.Button value={item.value} disabled={item.disabled} key={item.value}>
                          {item.label}
                        </Radio.Button>
                      ))}
                    </Card>
                  ) : null}
                  {provinceLS && provinceLS.length ? (
                    <Card title="L-S" bordered={false}>
                      {provinceLS.map((item) => (
                        <Radio.Button value={item.value} disabled={item.disabled} key={item.value}>
                          {item.label}
                        </Radio.Button>
                      ))}
                    </Card>
                  ) : null}
                  {provinceTZ && provinceTZ.length ? (
                    <Card title="T-Z" bordered={false}>
                      {provinceTZ.map((item) => (
                        <Radio.Button value={item.value} disabled={item.disabled} key={item.value}>
                          {item.label}
                        </Radio.Button>
                      ))}
                    </Card>
                  ) : null}
                </RadioGroup>
              </div>
            </TabPane>
            <TabPane tab="城市" key="2">
              <div
                className="address-cityTown-container"
                onFocusCapture={propsValue ? null : this.changeRadioCity}
              >
                {selectCity && selectCity.length ? (
                  <RadioGroup
                    buttonStyle="solid"
                    size="small"
                    // onChange={this.changeRadioCity}
                    value={cityValue}
                  >
                    {selectCity.map((item) => (
                      <Radio.Button
                        value={item[names.value]}
                        disabled={item.disabled}
                        key={item[names.value]}
                      >
                        {item[names.label]}
                      </Radio.Button>
                    ))}
                  </RadioGroup>
                ) : null}
              </div>
            </TabPane>
            <TabPane tab="区县" key="3" disabled={radioDis}>
              <div
                className="address-cityTown-container"
                onFocusCapture={propsValue ? null : this.changeRadioTown}
              >
                {selectTown && selectTown.length ? (
                  <RadioGroup
                    buttonStyle="solid"
                    size="small"
                    // onChange={this.changeRadioTown}
                    value={townValue}
                  >
                    {selectTown.map((item) => (
                      <Radio.Button
                        value={item[names.value]}
                        disabled={item.disabled}
                        key={item[names.value]}
                      >
                        {item[names.label]}
                      </Radio.Button>
                    ))}
                  </RadioGroup>
                ) : null}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Address;

Address.propTypes = {
  /**
   * 输入框占位文本
   */
  placeholder: t.string,
  /**
   * 是否支持清除
   */
  allowClear: t.bool,
  /**
   * 默认的选中项
   */
  defaultValue: t.array,
  /**
   * 指定选中项
   */
  value: t.array,
  /**
   * 自定义类名
   */
  className: t.string,
  /**
   * 当此项为 true 时，点选每级菜单选项值都会发生变化
   */
  changeOnSelect: t.bool,
  /**
   * 自定义 options 中 label name children 的字段
   */
  fieldNames: t.object,
  /**
   * 可选项数据源
   */
  options: t.array,
  /**
   * 禁用
   */
  disabled: t.bool,
};

Address.defaultProps = {
  placeholder: 'Please select',
  allowClear: true,
  defaultValue: [],
  changeOnSelect: false,
  fieldNames: { label: 'label', value: 'value', children: 'children' },
  disabled: false,
};
