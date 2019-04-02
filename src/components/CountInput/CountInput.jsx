import React, { Component, Fragment } from 'react';
import { Input } from 'antd';
import p from 'prop-types';
import './CountInput.scss';

export class CountInput extends Component {
  render() {
    return (
      <div className="countInput">
        <Input className="forestInput" />
        <span className="counts">1/20</span>
      </div>
    );
  }
}
