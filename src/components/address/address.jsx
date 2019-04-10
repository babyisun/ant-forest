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
      selectedPro: '',
      selectedCity: '',
      selectedTown: '',
      proValue: '',
      cityValue: '',
      townValue: '',
      iconHide: false,
    };
  }

  componentDidMount() {
    const { defaultValue } = this.props;
    const uuidv1 = require('uuid/v1');
    let isAG = [];
    let isHK = [];
    let isLS = [];
    let isTZ = [];
    citys.forEach((item) => {
      if (item.initial >= 'A' && item.initial <= 'G') {
        isAG.push({ value: item.value, label: item.label });
      } else if (item.initial >= 'H' && item.initial <= 'K') {
        isHK.push({ value: item.value, label: item.label });
      } else if (item.initial >= 'L' && item.initial <= 'S') {
        isLS.push({ value: item.value, label: item.label });
      } else {
        isTZ.push({ value: item.value, label: item.label });
      }
    });
    this.setState({
      provinceAG: isAG,
      provinceHK: isHK,
      provinceLS: isLS,
      provinceTZ: isTZ,
      spanKey: uuidv1(),
    });
    document.addEventListener('click', this.globalFun);
    if (defaultValue && defaultValue.length) {
      this.showDefaultValue(defaultValue);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.globalFun);
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
    const city = citys.find((item) => item.value === e.target.value);
    this.setState({
      proValue: e.target.value,
      cityValue: '',
      selectCity: city.children,
      selectedAddress: city.label,
      selectedPro: city.label,
      selectTown: [],
      activeKey: '2',
    });
  };

  changeRadioCity = (e) => {
    const { selectCity, selectedPro } = this.state;
    const town = selectCity.find((item) => item.value === e.target.value);
    this.setState({
      cityValue: e.target.value,
      townValue: '',
      selectTown: town.children,
      selectedCity: town.label,
      selectedAddress: `${selectedPro} / ${town.label}`,
      activeKey: '3',
    });
  };

  changeRadioTown = (e) => {
    const { selectTown, selectedPro, selectedCity } = this.state;
    const selectedTown = selectTown.find((item) => item.value === e.target.value);
    this.setState({
      townValue: e.target.value,
      selectedTown,
      selectedAddress: `${selectedPro} / ${selectedCity} / ${selectedTown.label}`,
      tabHide: false,
    });
  };

  inputClick = (e) => {
    const tabHide = !this.state.tabHide;
    this.setState({
      tabHide,
    });
  };

  iconClick = (e) => {
    e.stopPropagation();
    this.setState({
      selectedAddress: '',
      activeKey: '1',
      proValue: '',
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

  showDefaultValue = (defaultValue) => {
    let province, city, town, selectedAddress;
    if (defaultValue.length < 4) {
      province = citys.find((item) => item.value === defaultValue[0]);
      if (province) {
        selectedAddress = province.label;
        this.setState({
          selectedAddress,
          selectCity: province.children,
          proValue: province.value,
          selectedPro: province.label,
        });
        city = province.children.find((item) => item.value === defaultValue[1]);
        if (city) {
          selectedAddress += ` / ${city.label}`;
          this.setState({
            selectedAddress,
            selectTown: city.children,
            cityValue: city.value,
            selectedCity: city.label,
          });
          town = city.children.find((item) => item.value === defaultValue[2]);
          if (town) {
            selectedAddress += ` / ${town.label}`;
            this.setState({
              selectedAddress,
              townValue: town.value,
            });
          }
        }
      }
    }
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
    } = this.state;
    const { placeholder, allowClear = true } = this.props;
    return (
      <div className="address-container">
        <div
          onClick={(e) => this.inputClick(e)}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          className="address-select"
        >
          <Input
            id={spanKey}
            className="address-input"
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
              <div onFocusCapture={this.changeRadioProvince}>
                <RadioGroup
                  buttonStyle="solid"
                  size="small"
                  // onChange={this.changeRadioProvince}
                  value={proValue}
                >
                  <Card title="A-G" bordered={false}>
                    {provinceAG &&
                      provinceAG.length &&
                      provinceAG.map((item) => {
                        return <Radio.Button value={item.value}>{item.label}</Radio.Button>;
                      })}
                  </Card>
                  <Card title="H-K" bordered={false}>
                    {provinceHK &&
                      provinceHK.length &&
                      provinceHK.map((item) => {
                        return <Radio.Button value={item.value}>{item.label}</Radio.Button>;
                      })}
                  </Card>
                  <Card title="L-S" bordered={false}>
                    {provinceLS &&
                      provinceLS.length &&
                      provinceLS.map((item) => {
                        return <Radio.Button value={item.value}>{item.label}</Radio.Button>;
                      })}
                  </Card>
                  <Card title="T-Z" bordered={false}>
                    {provinceTZ &&
                      provinceTZ.length &&
                      provinceTZ.map((item) => {
                        return <Radio.Button value={item.value}>{item.label}</Radio.Button>;
                      })}
                  </Card>
                </RadioGroup>
              </div>
            </TabPane>
            <TabPane tab="城市" key="2">
              <div className="address-cityTown-container" onFocusCapture={this.changeRadioCity}>
                {selectCity && selectCity.length ? (
                  <RadioGroup
                    buttonStyle="solid"
                    size="small"
                    // onChange={this.changeRadioCity}
                    value={cityValue}
                  >
                    {selectCity.map((item) => {
                      return <Radio.Button value={item.value}>{item.label}</Radio.Button>;
                    })}
                  </RadioGroup>
                ) : null}
              </div>
            </TabPane>
            <TabPane tab="区县" key="3">
              <div className="address-cityTown-container" onFocusCapture={this.changeRadioTown}>
                {selectTown && selectTown.length ? (
                  <RadioGroup
                    buttonStyle="solid"
                    size="small"
                    // onChange={this.changeRadioTown}
                    value={townValue}
                  >
                    {selectTown.map((item) => {
                      return <Radio.Button value={item.value}>{item.label}</Radio.Button>;
                    })}
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
};

Address.defaultProps = {
  placeholder: 'Please select',
  allowClear: 'true',
  defaultValue: '[]',
};
