import React from 'react';
import { useClassName } from '../../.';
import theme from "../theme";

type CheckboxProps = React.HTMLProps<HTMLInputElement>;
const Checkbox: React.ComponentType<CheckboxProps> = ({ checked, ...rest }) => {
  const className = useCheckboxClassName({ checked });
  return (
    <input className={className} type="checkbox" checked={checked} {...rest} />
  );
};
const useCheckboxClassName = ({ checked }: CheckboxProps) => useClassName(`
position: relative;
cursor: pointer;
appearance: none;
min-height: ${theme.fontSizes.S}rem;
width: ${theme.fontSizes.S}rem;
outline: none;
::before, ::after {
    content: '';
    position: absolute;
}
::before {
    border: 1px solid ${theme.colors.grey};
    height: ${theme.fontSizes.S}rem;
    width: ${theme.fontSizes.S}rem;
    top: calc(50% - ${theme.fontSizes.S / 2}rem);
    left: calc(50% - ${theme.fontSizes.S / 2}rem);
    border-radius: ${theme.borderRadians.S}px;
    background: light-grey;
}
${checked ? `
::after {
    border: 1px solid ${theme.colors.black};
    top: calc(50% - 9px);
    left: calc(50% - 4px);
    height: 16px;
    width: 8px;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}` : ''}
`);

Checkbox.defaultProps = {
  onChange(e: any) {},
};
export default Checkbox;
