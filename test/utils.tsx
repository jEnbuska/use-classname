import {StyleProvider, StyleProviderProps} from "../src";
import {Sheet} from "../src/types";
import * as React from "react";
import * as ReactDOM from "react-dom";

export const TestStyleProvider = (props: StyleProviderProps) => {
    return (<StyleProvider {...props}/>)
};

export function renderTestAppWithHook(cb: () => any){
    const div = document.createElement('div');
    const sheet = createTestSheet();
    const TestApp = () => {
        cb && cb();
        return null;
    };
    ReactDOM.render((
        <TestStyleProvider classNamePrefix="test" sheet={sheet}>
            <TestApp/>
        </TestStyleProvider>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
}

export function createTestSheet(): Sheet & {data: string[]} {
    const data: string[] = [];
    return {
        data,
        addCss(css: string) {
            data.push(css);
            return css;
        },
        removeCss(css: string): void {
            data.splice(data.indexOf(css), 1);
        },
    }
}