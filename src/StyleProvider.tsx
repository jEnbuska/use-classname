import React, { ComponentType, ReactNode, useMemo} from 'react';
import StyleContext from './StyleContext';
import {useDevWarnings, useSheet, useStylis} from "./hooks";
import {StylisConfig, Sheet} from "./types";

export type StyleProviderProps = {
  children: ReactNode;
  classNamePrefix?: string; // prefix of each css class
  sheet?: Sheet; // interface which hooks use for adding and removing styles
  ttl?: number; // duration after which unused style will be removed from style tag
  scopedStylisConfig?: StylisConfig; // scoped stylis config that will be merged with default stylis config
  globalStylisConfig?: StylisConfig; // global stylis config that will be merged with default stylis config
}

const StyleProvider: ComponentType<StyleProviderProps> = (props) => {
  const {children, classNamePrefix = 'use-classname', ttl = 0, scopedStylisConfig, globalStylisConfig} = props;
  useDevWarnings(props);
  const stylisis = useStylis(scopedStylisConfig, globalStylisConfig);
  const sheet = useSheet(props.sheet);
  useMemo(() => {
    if(sheet.initialize) sheet.initialize();
  },[]);
  const contextValue = useMemo(() => {
    return { classNamePrefix, sheet, ttl, stylisis };
  }, []);
  return (
    <StyleContext.Provider value={contextValue}>
      {children}
    </StyleContext.Provider>
  );
};

export default StyleProvider;
