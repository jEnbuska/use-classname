# use-classname

***This library is highly experimental. Please don't use it in production.***

Simple hook based component styling library for React. 

+ Powered by [stylis](https://www.npmjs.com/package/stylis) 
+ Inspired by [styled-components](https://www.npmjs.com/package/styled-components) and [emotion](https://www.npmjs.com/package/emotion)
+ No [HOC](https://reactjs.org/docs/higher-order-components.html):s
+ Typescript support 
+ No headache with typescript typings
+ Easy css reuse

### Example:
#### Basic:
```
/* ...  */
import { useClassName, StyleProvider, useGlobalStyles } from 'use-classname';
import theme from './theme';

const App = () => {
    
    useGlobalStyles(´
        body {
            margin: 0;
            padding: 0;
            background-color: ${theme.colors.white};
        }
    ´);
    
    const className = useClassName(´
        display: flex;
    ´);
    
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

#### Style overriding:
```
/* ... */
import { useClassName } from 'use-classname';
import theme from './theme';

const Input = ({css, ...rest}) => {
    const className = useClassName(´
        ${theme.styles.formElement};
        ${theme.styles.input};
        ${css};
    ´);
    
    return (
        <input {...rest} className={className} />
    )
}

const SmilyInput = () => (
    <Input css={`::after: {content: theme.svgs.smile}`} />
);
```
For real examples see [example](https://github.com/jEnbuska/use-classname/tree/master/example) folder

### Advance configs and props

```
type StyleProviderProps = {
  // prefix of each css class
  classNamePrefix?: string; 
  
  // interface which hooks use for adding and removing styles (default to 0)
  sheet?: Sheet; 
  
  // duration after which unused style will be removed from style tag
  ttl?: number; 
  
  // scoped stylis config that will be merged with default stylis config
  scopedStylisConfig?: StylisOptions; 
  
  // global stylis config that will be merged with default stylis config
  globalStylisConfig?: StylisOptions; 
  
  children: ReactNode;
}
```

```
StyleProviderProps['scopedStylisConfig' | 'globalStylisConfig']

type StylisConfig = {
    keyframe?: boolean;
    cascade?: boolean;
    compress?: boolean;
    prefix?: boolean | ((key: string, value: string, context: number) => boolean);
    semicolon?: boolean;
    preserve?: boolean;
}

defaults: {
    cascade: true,
    keyframe: false,
    prefix: true,
    compress: false,
    preserve: true,
}
```

```
StylProviderProps['sheet']

type Sheet<S = any> = {
    // called once on during first render
    initialize?: () => void;
    
    // called when a new css is defined
    addCss(css: string): S; 
    
    // called when css is no longer user, after ttl duration
    removeCss?(node: S): void; 
    
    // called during StyleProvider unmount
    willUnmount?(): void; 
};
```
