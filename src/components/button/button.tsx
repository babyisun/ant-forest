import React, { SFC } from 'react';
// import t from 'prop-types';
import './button.scss';

type Kind = 'primary' | 'secondary' | 'cancel' | 'dark' | 'gray';


export interface ButtonProps {
  scale: 'small' | 'normal' | 'big';
  kind: 'default' | 'primary' | 'secondary' | 'cancel' | 'dark' | 'gray';
}

const ButtonStyled = (
  { kind = 'default' }: ButtonProps, 
  { scale = 'normal' }: ButtonProps, 
  children: React.ReactNode | String ) => (
  <button className={['button', scale, kind].join(' ')}>{children}</button>
);

export const Button: SFC<ButtonProps> = ({ children, ...props }) => (
  <ButtonStyled {...props}>{children}</ButtonStyled>
);
