import React from 'react';
import { Badge, Statistic, Spin } from 'antd';
import t from 'prop-types';
import './button.scss';

const ButtonStyled = ({ scale = 'normal', kind = 'default', children }) => (
  <button className={['button', scale, kind].join(' ')}>{children}</button>
);

export const Button = ({ children, ...props }) => (
  <Badge count={5}>
    <ButtonStyled {...props}>{children}</ButtonStyled>
  </Badge>
);

Button.propTypes = {
  scales: t.oneOf(['small', 'normal', 'big']),
  kind: t.oneOf(['primary', 'secondary', 'cancel', 'dark', 'gray']),
};

Button.defaultProps = {
  scales: 'normal',
  kind: 'primary',
};
