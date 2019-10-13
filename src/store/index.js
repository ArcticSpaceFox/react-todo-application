import { createStore } from "easy-peasy";

import { TodoModel, TodoDB } from "./todostore";

export const store = createStore({
	todos: TodoModel,
	db: TodoDB
});