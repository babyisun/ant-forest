import React, { Component } from 'react';
import { Tabs, Radio, Card, Mention, Icon } from 'antd';
import citys from './city';
import './address.scss';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const { toContentState } = Mention;

class Address extends Component {
  state = {
    activeKey: '1',
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

  componentDidMount() {
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
    });
    document.addEventListener('click', this.globalFun);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.globalFun);
  }

  globalFun = () => {
    this.setState({
      tabHide: false,
    });
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
    e.nativeEvent.stopImmediatePropagation();
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
    } = this.state;

    return (
      <div className="address-container">
        <div
          className="address-input"
          onClick={(e) => this.inputClick(e)}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
        >
          <Mention placeholder="Please select" value={toContentState(selectedAddress)} readOnly />
          {iconHide ? (
            <Icon
              className="address-input-icon"
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
              <div>
                <RadioGroup
                  buttonStyle="solid"
                  size="small"
                  onChange={this.changeRadioProvince}
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
              <div className="address-cityTown-container">
                {selectCity && selectCity.length ? (
                  <RadioGroup
                    buttonStyle="solid"
                    size="small"
                    onChange={this.changeRadioCity}
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
              <div className="address-cityTown-container">
                {selectTown && selectTown.length ? (
                  <RadioGroup
                    buttonStyle="solid"
                    size="small"
                    onChange={this.changeRadioTown}
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
