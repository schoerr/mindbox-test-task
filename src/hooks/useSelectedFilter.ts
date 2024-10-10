import { useState, useEffect } from "react";
import type { Todo, TodoFilters } from "types";

export const useSelectedFilter = (
  todos: Todo[],
  filter: TodoFilters,
): Todo[] => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    switch (filter) {
      case "All":
        setFilteredTodos(todos);
        break;
      case "Done":
        setFilteredTodos(todos.filter(todo => todo.status === true));
        break;
      case "Not Done":
        setFilteredTodos(todos.filter(todo => todo.status === false));
        break;
    }
  }, [todos, filter]);

  return filteredTodos;
};
