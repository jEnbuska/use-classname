### use-classname
Simple hook based component styling library for React. 

Powered by [stylis](https://www.npmjs.com/package/stylis) 

***This library is highly experimental. Please don't use it in production.***

#### Example:
```
...
import useClassName, { StyleProvider, useGlobalStyles } from 'use-classname';
import theme from './theme';

const App = () => {
    useGlobalStyles(´
        body {
            margin: 0;
            padding: 0;
            background-color: ${theme.colors.white};
        }´);
    
    const className = useClassName(´
        display: flex;
        ´)
    return (
        <div className={className}>
            {/* ... */}
        </div>
    )
}

const Root = () => {
    return (
        <StyleProvider>
          <App />
        </StyleProvider>
    );
};
```
For more examples see /examples