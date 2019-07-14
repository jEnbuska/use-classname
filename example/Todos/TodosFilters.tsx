import React, { memo, useCallback } from 'react';
import { useClassName } from '../../.';
import Button from '../Elements/Button';
import theme from "../theme";

type TodosFilterProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filters: string[];
};
const TodosFilter: React.ComponentType<TodosFilterProps> = memo(({ activeFilter, filters, setActiveFilter }) => {
    const onSetActiveFilter = useCallback(e => {
      setActiveFilter(e.target.name);
    }, []);
    const className = useTodosFilterClassName();
    return (
      <div className={className}>
        {filters.map((key, i) => (
          <Button
            key={key}
            name={key}
            onClick={onSetActiveFilter}
            css={key === activeFilter ? '' : 'border: none;'}
          >
            {key}
          </Button>
        ))}
      </div>
    );
});

const useTodosFilterClassName = () => useClassName(`
display: grid;
justify-content: center;
grid-template-columns: repeat(3, max-content);
gap: ${theme.gaps.S}rem;
background: ${theme.colors.white};
border: 1px solid ${theme.colors.lightGrey};
padding: 5px;
.filter-inactive {
    border: 1px solid transparent
}
.filter-active {
    border: 1px solid ${theme.colors.lightGrey}
    border-radius: ${theme.borderRadians.S}px;
}
`);

export default TodosFilter;
