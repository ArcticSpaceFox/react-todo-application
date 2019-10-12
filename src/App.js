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
      state.items.splice(state.items.indexOf(payload), 1)
    }),
    toggle: action((state, payload) => {
      state.items = state.items.map(todo => todo.id === payload.id ? {...todo, done: !todo.done} : todo)
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
