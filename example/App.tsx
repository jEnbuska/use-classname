import React, {ComponentType} from "react";
import Todos from './Todos';
import {useGlobalStyles, useClassName} from "../.";
import theme from "./theme";

const App: ComponentType = () => {
  useAppsGlobalStyles();
  const className = useAppClassName();
  return (
    <div className={className}>
      <Todos/>
    </div>
  );
};
const useAppsGlobalStyles = () => useGlobalStyles(`
* {
    &, &::before, &::after {
        box-sizing: border-box;
    }
}
body {
    margin: 0;
    padding: 0;
    background-color: ${theme.colors.white};
}
#root {
    width: 100%;
    height: 100%;
    overflow: auto;
}`);
const useAppClassName = () => useClassName(`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
`);
export default App;