import React, {
  ComponentType,
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { useClassName } from '../../.';
import Checkbox from '../Elements/Checkbox';
import Close from '../Elements/Close';
import Input from '../Elements/Input';
import Label from '../Elements/Label';
import theme from "../theme";

export type TodoProps = {
  todo: TodoItem;
  toggleDone(id: string): void;
  removeTodo(id: string): void;
  updateText(id: string, text: string): void;
};

const useTodoStateReducer = ({text}) => {
    return useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'EDIT_TEXT':
                    return { ...prevState, value: action.payload };
                case 'TOGGLE_EDIT':
                    return { ...prevState, edit: !prevState.edit };
                case 'UPDATED':
                    return { edit: false, value: action.payload };
            }
        },
        { value: text, edit: false }
    );
};
const Todo: ComponentType<TodoProps> = memo(({ todo, toggleDone, removeTodo, updateText }) => {
    const { id, done, text } = todo;
    const onToggleDone = useCallback(() => toggleDone(id), [done]);
    const onRemove = useCallback(() => removeTodo(id), [done]);
    const [{ value, edit }, dispatch] = useTodoStateReducer({text});
    const onChange = useCallback(
      e => dispatch({ type: 'EDIT_TEXT', payload: e.target.value }),
      []);
    const setEdit = useCallback(() => {
      dispatch({ type: 'TOGGLE_EDIT' });
    }, []);
    const inputRef = useRef<any>();
    useEffect(() => {
      if (edit) inputRef.current!.focus();
    }, [edit]);
    const onUpdateText = useCallback(() => {
      updateText(id, value);
      dispatch({ type: 'TOGGLE_EDIT' });
    }, [value]);
    const className = useTodoClassName();
    const labelCss= `
    font-size: ${theme.fontSizes.S}rem;
    overflow: hidden;
    `;
    return (
      <li className={className}>
          <Checkbox
          checked={done}
          onChange={onToggleDone}
          aria-labelledby={`todo-label-${id}`}
        />

        {edit ? (
          <Input
            value={value}
            onChange={onChange}
            onBlur={onUpdateText}
            ref={inputRef}
          />
        ) : (
          <Label id={`todo-label-${id}`} tabIndex={-1} onDoubleClick={setEdit} css={labelCss}>
            {text}
          </Label>
        )}
        <Close onClick={onRemove} />
      </li>
    );
});

const useTodoClassName = () => useClassName(`
list-style: none;
display: grid;
grid-template-columns: min-content 1fr min-content;
gap: ${theme.gaps.M}rem;
background: ${theme.colors.white};
padding: ${theme.gaps.S}rem;
align-items: stretch;
`);

export default Todo;
