import React, { Component, Fragment, Children } from 'react';
import { Button, Icon } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QueueAnim from 'rc-queue-anim';
import t from 'prop-types';
import './Copy.scss';

class Copy extends Component {
  state = {
    copied: false,
    preCombatant: false,
  };

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

  render() {
    const { label, text, type, children, tipsIcon, ...args } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={text} onCopy={this.onCopy} {...args}>
        <button className={`copyBtn ${type === 'text' ? 'minWidth' : null}`} size="small">
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
        复制成功图标配置
    */
  tipsIcon: t.object,
};

Copy.defaultProps = {
  /* eslint-disable */
  // value: '',
  type: 'text',
  label: '复制到粘贴板',
  // tipsIcon: null,
};
