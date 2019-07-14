import React, { useMemo } from 'react';
import Todo, { TodoProps } from './Todo';
import useClassName from '../../.';
import { noGaps } from '../styles';
import theme from "../theme";

type TodoListProps = Omit<TodoProps, 'todo'> & {
  todos: TodoItem[];
  filter: string;
};

const predicates = {
  all: () => true,
  active: (todo: TodoItem) => !todo.done,
  completed: (todo: TodoItem) => todo.done,
};
const TodoList: React.ComponentType<TodoListProps> = ({ todos, toggleDone, removeTodo, updateText, filter, }) => {
  const filteredTodos = useMemo(() => todos.filter(predicates[filter]), [ filter, todos, ]);
  const className = useTodoListClassName();
  return (
    <ul className={className}>
      {filteredTodos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          toggleDone={toggleDone}
          removeTodo={removeTodo}
          updateText={updateText}
        />
      ))}
    </ul>
  );
};
const useTodoListClassName = () => useClassName(`
${noGaps}
display: grid;
grid-template-columns: 100%;
gap: 1px;
padding: 1px;
overflow: auto;
background: ${theme.colors.lightGrey};
max-width: 100%;
`);

export default TodoList;
