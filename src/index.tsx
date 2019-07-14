import StyleProvider, {StyleProviderProps} from './_StyleProvider';
import { publicHooks } from './hooks';
import _StyleContext from './StyleContext';

const {_useClassName: useClassName, _useGlobalStyles: useGlobalStyles} = publicHooks;
// All exports are named with underscore for better auto importing from the root folder
export {useClassName, useGlobalStyles, StyleProvider, StyleProviderProps, _StyleContext};