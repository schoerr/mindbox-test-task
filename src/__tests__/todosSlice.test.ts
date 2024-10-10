import { setupStore } from "../store/store";
import {
  addTask,
  editTask,
  deleteTodo,
  TodosState,
} from "../store/slices/todosSlice/index";
import type { Store } from "@reduxjs/toolkit";

describe("todos slice testing", () => {
  let store: Store;
  let state: TodosState;

  beforeEach(() => {
    store = setupStore();
    state = store.getState().todos;
  });

  test("create todo", () => {
    const initialTodosCount = state.todos.length;

    store.dispatch(addTask("Test task"));
    state = store.getState().todos;

    expect(initialTodosCount).toBeLessThan(state.todos.length);
  });

  test("edit task", () => {
    store.dispatch(addTask("Test task"));
    state = store.getState().todos;

    const initialTitleTask = state.todos[state.todos.length - 1].title;
    const idInitialTitleTask = state.todos[state.todos.length - 1].id;

    store.dispatch(
      editTask({ id: idInitialTitleTask, title: "Test task changed" }),
    );
    state = store.getState().todos;

    expect(initialTitleTask).not.toBe(
      state.todos[state.todos.length - 1].title,
    );
  });

  test("delete task", () => {
    store.dispatch(addTask("Test task"));
    state = store.getState().todos;

    const idAddedTask = state.todos[state.todos.length - 1].id;

    store.dispatch(deleteTodo(idAddedTask));
    state = store.getState().todos;

    expect(state.todos).not.toContain(idAddedTask);
  });
});
