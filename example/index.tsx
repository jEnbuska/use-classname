import React from 'react';
import ReactDOM from 'react-dom';
import { StyleProvider } from '../.';
import App from "./App";

const Root = () => {
  return (
    <StyleProvider>
      <App />
    </StyleProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
