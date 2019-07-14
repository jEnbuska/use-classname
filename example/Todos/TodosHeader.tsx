import React, { ComponentType } from 'react';
import useClassName from '../../.';
import theme from "../theme";

const TodosHeading: ComponentType<{}> = () => {
  const className = useTodosHeadingClassName();
  return <h1 className={className}>todos</h1>;
};

const useTodosHeadingClassName = () => useClassName(`
text-align: center;
font-size: ${theme.fontSizes.XL}rem;
margin: 0;
color: ${theme.colors.black};
`);

export default TodosHeading;
