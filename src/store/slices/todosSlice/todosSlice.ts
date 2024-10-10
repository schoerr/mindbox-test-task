import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { Todo, TodoFilters } from "types";
import type { DropResult } from "react-beautiful-dnd";

export interface TodosState {
  todos: Todo[];
  isOpenModalForm: boolean;
  isOpenEditModalForm: boolean;
  idEditedTask: string;
  currentFilter: TodoFilters;
}

const initialState: TodosState = {
  todos: JSON.parse(localStorage.getItem("todos") as string) || [
    { id: "11", title: "Task1", status: false },
    { id: "2222", title: "Task2", status: true },
  ],
  isOpenModalForm: false,
  isOpenEditModalForm: false,
  idEditedTask: "",
  currentFilter: "All",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<string>) {
      const todoId = action.payload;
      const todoToUpdate = state.todos.find(todo => todo.id === todoId);

      if (todoToUpdate) {
        todoToUpdate.status = !todoToUpdate.status;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const todoId = action.payload;

      state.todos = state.todos.filter(todo => todo.id !== todoId);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    addTask(state, action: PayloadAction<string>) {
      const titleTodo = action.payload;

      const newTodo = {
        id: uuidv4(),
        title: titleTodo,
        status: false,
      };

      state.todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTask(state, action: PayloadAction<{ id: string; title: string }>) {
      const { id, title } = action.payload;
      const todoToUpdate = state.todos.find(todo => todo.id === id);

      if (todoToUpdate) {
        todoToUpdate.title = title;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    changeStatusModalForm(state) {
      state.isOpenModalForm = !state.isOpenModalForm;
    },
    changeStatusEditModalForm(state) {
      state.isOpenEditModalForm = !state.isOpenEditModalForm;
    },
    setIdEditedTask(state, action: PayloadAction<string>) {
      state.idEditedTask = action.payload;
    },
    setFilterTodo(state, action: PayloadAction<TodoFilters>) {
      state.currentFilter = action.payload;
    },
    onDragEnd(state, action: PayloadAction<DropResult>) {
      const result = action.payload;

      if (!result.destination) return;

      const [reorderItem] = state.todos.splice(result.source.index, 1);
      state.todos.splice(result.destination.index, 0, reorderItem);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const {
  setStatus,
  deleteTodo,
  addTask,
  editTask,
  changeStatusModalForm,
  changeStatusEditModalForm,
  setIdEditedTask,
  setFilterTodo,
  onDragEnd,
} = todosSlice.actions;
