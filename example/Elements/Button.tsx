import React, { ComponentType, HTMLProps } from 'react';
import useClassName from '../../.';
import { noGaps } from '../styles';
import theme from "../theme";

type ButtonProps = {
  css?: string;
} & HTMLProps<HTMLButtonElement>;
const Button: ComponentType<ButtonProps> = ({ css, ...rest }: any) => {
  const className = useButtonClassName({ css });
  return <button {...rest} className={className} />;
};
const useButtonClassName = ({ css = '' }: ButtonProps) => useClassName(`
${noGaps}
background: none;
outline: none;
padding: ${theme.gaps.XS}rem ${theme.gaps.S}rem;
font-size: ${theme.fontSizes.XS}rem;
border: 1px solid ${theme.colors.lightGrey};
color: ${theme.colors.black};
&:hover {
  cursor: pointer;  
}
&:disabled {
  cursor: default;
  color: ${theme.colors.lightGrey};
}
${css}
`);

export default Button;
