import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { todosSlice } from "./slices/todosSlice";

const rootReducer = combineReducers({
  todos: todosSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
