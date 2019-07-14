import React, { ComponentType, HTMLProps } from 'react';
import { useClassName } from '../../.';
import theme from "../theme";

type InputProps = {
  css?: string;
} & HTMLProps<HTMLInputElement>;

const Input: ComponentType<InputProps> = React.forwardRef(({ css, ...rest }, ref) => {
    const className = useInputClassName({ css });
    return <input ref={ref} {...rest} className={className} />;
  }
);

const useInputClassName = ({ css }: InputProps) => useClassName(`
font-size: ${theme.fontSizes.S}rem;
padding: 0 ${theme.gaps.S}rem;
outline: none;
border: 1px solid ${theme.colors.lightGrey};
color: ${theme.colors.black};
background: ${theme.colors.white};
${css}
`);
export default Input;
