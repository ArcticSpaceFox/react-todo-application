import React from 'react';

import { createStore, action, StoreProvider } from "easy-peasy";

import Navbar from "./components/navabar";
import TodoList from "./components/todolist";

const store = createStore({
  todos: {
    items: [],
    add: action((state, payload) => {
      state.items.push({
        "id": Date.now(),
        "value": payload,
        "done": false
      })
    }),
    del: action((state, payload) => {
      state.map(todo => todo.id === payload.id ? '' : todo)
    })
  }
})

function App() {
  return (
    <StoreProvider store={store}>
      <Navbar/>
      <TodoList/>
    </StoreProvider>
  );
}

export default App;
