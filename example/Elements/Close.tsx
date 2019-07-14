import * as React from 'react';
import { noGaps } from '../styles';
import { useClassName } from '../../.';
import theme from "../theme";

type CloseProps = { onClick(): void };
const Close: React.ComponentType<CloseProps> = props => {
  const className = useCloseClassName();
  return <button {...props} className={className} />;
};

const useCloseClassName = () => useClassName(`
${noGaps};
background: transparent;
border: none;
min-width: ${theme.fontSizes.M}rem;
min-height: ${theme.fontSizes.M}rem
position: relative;
outline: none;
::before, ::after {
    position: absolute;
    content: '';
    margin: auto auto;
    width: 0px;
    height: ${theme.fontSizes.M}rem;
    top: calc(50% - ${theme.fontSizes.M / 2}rem);
    border: 1px solid ${theme.colors.grey};
}
&::before {
    transform: rotate(45deg);
}
&::after {
    transform: rotate(-45deg);
}`);

export default Close;
