import React, { Component, Fragment } from 'react';
import NProgress from 'nprogress';
import t from 'prop-types';
import './topProgress.scss';

const topProgress = ({ ...props }) => <Fragment />;

Object.entries(NProgress).forEach(([key, value]) => {
  topProgress[key] = value;
});

topProgress.propTypes = {
  /**
        进度条完成以后是否继续显示, true 为显示 false 为不显示
    */
  status: t.bool,
  /**
        进度条启动时候默认填充多少进度 0 - 1 以内任何浮点数 
    */
  'options.minimum': t.number,
  /**
        进度条自定义 html 模板, 为了正常选取到进度条元素, 必须添加 role='bar' 属性,
    */
  'options.template': t.string,
  /**
        进度条动画效果 ease | linear |...,
    */
  'options.easing': t.string,
  /**
        进度条增长速度
    */
  'options.speed': t.number,
  /**
        是否开启自动递增
    */
  'options.trickle': t.bool,
  /**
        自动递增频率, 单位: ms
    */
  'options.trickleSpeed': t.number,
  /**
        是否开启旋转 loading 元素
    */
  'options.showSpinner': t.bool,
  /**
        进度条所在父元素, css 选择器
    */
  'options.parent': t.string,
};

topProgress.defaultProps = {
  status: false,
  'options.minimum': 0.08,
  'options.template':
    '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
  'options.easing': 'ease',
  'options.speed': 200,
  'options.trickle': true,
  'options.trickleSpeed': 200,
  'options.showSpinner': false,
  'options.parent': 'body',
};

export default topProgress;
