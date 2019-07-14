import React, { ComponentType, useCallback, useState } from 'react';
import useClassName from '../../.';
import { noGaps } from '../styles';
import Button from '../Elements/Button';
import Input from '../Elements/Input';
import theme from "../theme";

type TodoFormProps = {
  createTodo: (todo: TodoItem) => void;
};
const TodoForm: ComponentType<TodoFormProps> = ({ createTodo }) => {
  const [text, setText] = useState('');
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if(!text) return;
      createTodo({ text, id: `${Math.random()}`, done: false });
      setText('');
    },
    [text]
  );
  const onChange = useCallback(e => {
    setText(e.target.value);
  }, []);
  const className = useTodoFormClassName();
  const buttonCss = `font-size: ${theme.fontSizes.S}rem;`;
  return (
    <form className={className} onSubmit={onSubmit}>
      <Input onChange={onChange} value={text} />
      <Button css={buttonCss} disabled={!text}>Add Todo</Button>
    </form>
  );
};

const useTodoFormClassName = () => useClassName(`
${noGaps};
gap: 1px;
display: grid;
grid-template-columns: 1fr max-content;
`);
export default TodoForm;
