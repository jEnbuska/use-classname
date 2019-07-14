import { useContext, useEffect, useMemo, useLayoutEffect, useRef } from 'react';
import Stylis from 'stylis';
import StyleContext from './StyleContext';
import {StylisConfig, CssMetaData, Sheet} from './types';

const CssMetaData = new Map<string, CssMetaData>();
const defaultConfig = {global: false};
let classNameCount = 0;

// Exported hooks ---START---

// Named with underscore so that IDEs don't try to import resource from /dist
// injects scoped css to style tag and return classname for that scope
export function _useClassName(css: string, {global} = defaultConfig): string {
  const styleContext = useContext(StyleContext);
  if(!styleContext) throw new Error('StyleContext used without a parent provider');
  const {classNamePrefix, sheet, ttl, stylisis} = styleContext;
  const cssKey = `${global ? 'global_' : 'scoped_'}${classNamePrefix}${css}`;
  // Create CSS metadata or clear removal timeouts and increment usage
  const definition = useMemo(() => {
    if (CssMetaData.has(cssKey)) {
      const data = CssMetaData.get(cssKey)!;
      data.usage++;
      clearTimeout(data.timeout);
      data.timeout = 0;
      return data;
    }
    // create unique classname
    const className = `${classNamePrefix}-${classNameCount++}`;
    const data = {
      initialized: false,
      className,
      node: null,
      usage: 1,
      timeout: 0,
    };
    CssMetaData.set(cssKey, data);
    return data;
  }, [cssKey]);

  const { className } = definition;

  // append css to style tag or skip if it has already been initialized
  useLayoutEffect(() => {
    if (definition.initialized) return;
    const transpiled = global
        ? stylisis.global(css)
        : stylisis.scoped(`.${className}`, css);
    definition.node  = sheet.addCss(transpiled);
    definition.initialized = true;
  }, [className]);

  // remove styles from style tag if it is no-longer used
  useEffect(() => () => {
        if (definition.timeout || --definition.usage) return;
        definition.timeout = setTimeout(() => {
          const { node } = definition;
          CssMetaData.delete(cssKey);
          if(sheet.removeCss) sheet.removeCss(node);
        }, ttl);
      },[className]
  );
  return className;
}

// Named with underscore so that IDEs don't try to import resource from /dist
// injects global css to style tag
const globalStylesConfig = {global: true};
export function _useGlobalStyles(css: string): void {
  _useClassName(css, globalStylesConfig);
}

// Exported hooks ---END---

// Internal hooks ---START---

export function useDevWarnings(props: any) {
  if(process.env.NODE_ENV !== 'development') return;
  const mounting = useRef(true);
  const cb = useRef(() => {
    if(mounting.current) {
      mounting.current = false;
    } else {
      console.error("StyleProvider properties changed during render. Changed StyleProvider properties will be ignored");
      cb.current = () => {};
    }
  });
  useEffect(cb.current, [props.ttl, props.classNamePrefix, props.sheet, props.globalStylisConfig, props.scopedStylisConfig]);
}

export function useSheet(sheet?: Sheet): Sheet {
  const sheetInstance = useMemo<Sheet>(() => {
    if(sheet) return sheet;
    let styleElement: HTMLElement;
    return {
      initialize(){
        const head = document.head || document.getElementsByTagName('head')[0];
        styleElement = document.createElement('style');
        head.appendChild(styleElement);
      },
      addCss(css: string) {
        const node: Text = document.createTextNode(css);
        styleElement.append(node);
        return node;
      },
      removeCss(node: Text): void {
        styleElement.removeChild(node);
      },
      willUnmount(): void {
        styleElement.remove();
      }
    }
  }, []);
  useEffect(() => () => {
    if(sheetInstance.willUnmount) sheetInstance.willUnmount();
  }, []);
  return sheetInstance;
}

const defaultStylisConfig = {
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  preserve: true,
};

export function useStylis(scopedStylisConfig?: StylisConfig, globalStylisConfig?: StylisConfig) {
  return useMemo(() => {
    const scopedStylis = new Stylis({...defaultStylisConfig, global: false, ...scopedStylisConfig});
    const globalStylis = new Stylis({...defaultStylisConfig, global: true, ...globalStylisConfig});
    return {
      global(css: string) {
        return globalStylis('', css);
      },
      scoped(className: string, css: string){
        return scopedStylis(className, css)
      }
    }
  }, [])
}

// Internal hooks ---END---
