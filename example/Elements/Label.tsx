import React, { ComponentType, HTMLProps } from 'react';
import { useClassName } from '../../.';
import theme from "../theme";

type LabelProps = {
  flow?: 'row' | 'column';
  css?: string;
} & HTMLProps<HTMLLabelElement>;
const Label: ComponentType<LabelProps> = ({ flow, css, ...rest }) => {
  const className = useLabelClassName({ flow, css });
  return <label {...rest} className={className} />;
};
const useLabelClassName = ({ flow, css }: LabelProps) => useClassName(`
font-size: ${theme.fontSizes.XS}rem;
outline: none;
display: grid;
gap: ${theme.gaps.XS}rem;
grid-auto-columns: max-content;
${flow === 'column' ? `
grid-template-columns: max-content 1fr;
grid-auto-flow: ${flow};
` : ''}
align-items: center;
color: ${theme.colors.black};
${css};`);
Label.defaultProps = {
  flow: 'row',
  css: '',
};

export default Label;
