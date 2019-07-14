import StyleProvider, {StyleProviderProps} from './_StyleProvider';
import { _useClassName as useClassName, _useGlobalStyles as useGlobalStyles} from './hooks';
import _StyleContext from './StyleContext';

// All exports are named with underscore for better auto importing from the root folder
export {useClassName, useGlobalStyles, StyleProvider, StyleProviderProps, _StyleContext};