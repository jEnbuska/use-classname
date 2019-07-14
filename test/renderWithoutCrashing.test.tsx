import useClassName, {useGlobalStyles} from "../src";
import {renderTestAppWithHook} from './utils'


it('render app with StyleProvider context', () => {
  renderTestAppWithHook(() => {});
});

it('render app with classname hook', () => {
  renderTestAppWithHook(() => useClassName('color: red;'))
});

it('render app with global styles hook', () => {
  renderTestAppWithHook(() => useGlobalStyles(`color: red;`))
});



