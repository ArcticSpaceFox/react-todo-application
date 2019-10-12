import { todo } from "./TodoReducer";

import { combineReducers } from "redux";

export const allReducers = combineReducers({
  todos: todo,
})
