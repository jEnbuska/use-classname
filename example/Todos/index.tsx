import React, {
  ComponentType,
  useCallback,
  useReducer,
  useState,
} from 'react';
import useClassName from '../../.';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodosHeader from './TodosHeader';
import TodosFilter from './TodosFilters';
import { getItemOrDefault } from '../utils';
import theme from "../theme";

const filters = ['all', 'active', 'completed'];

const defaultData = getItemOrDefault('stored-todos', [
  { text: 'learn hooks', done: true, id: 0 },
  { text: 'learn css', done: false, id: 1 },
]);
const TodoApp: ComponentType<{}> = () => {
  const [todos, dispatch] = useReducer((todos: TodoItem[], cb): TodoItem[] => {
    todos = cb(todos);
    localStorage.setItem('stored-todos', JSON.stringify(todos));
    return todos;
  }, defaultData);
  const [filter, setActiveFilter] = useState('all');
  const createTodo = useCallback((todo: TodoItem) => {
    dispatch((todos: TodoItem[]) => [todo, ...todos]);
  }, []);

  const toggleDone = useCallback((id: string) => {
    dispatch((todos: TodoItem[]) => todos.map(it => (it.id === id ? { ...it, done: !it.done } : it)));
  }, []);
  const removeTodo = useCallback((id: string) => {
    dispatch((todos: TodoItem[]) => todos.filter(it => it.id !== id));
  }, []);
  const updateText = useCallback((id: string, text: string) => {
    dispatch((todos: TodoItem[]) => todos.map(it => (it.id === id ? { ...it, text } : it)));
  }, []);
  const className = useTodoAppClassName();
  return (
    <main className={className}>
      <TodosHeader />
      <TodoForm createTodo={createTodo} />
      <TodoList
        todos={todos}
        filter={filter}
        toggleDone={toggleDone}
        removeTodo={removeTodo}
        updateText={updateText}
      />
      <TodosFilter
        activeFilter={filter}
        filters={filters}
        setActiveFilter={setActiveFilter}
      />
    </main>
  );
};

const useTodoAppClassName = () => useClassName(`
background: ${theme.colors.white};
width: 600px;
max-width: calc(100% - ${theme.gaps.M * 2}rem);
position: relative;
height: 100%;
padding: ${theme.gaps.S}rem;
margin: 0;
`);

export default TodoApp;
