import React from 'react';

import {StoreProvider } from "easy-peasy";
import { store } from "./store";

import Navbar from "./components/navabar";
import TodoList from "./components/todolist";

function App() {
  return (
    <StoreProvider store={store}>
      <Navbar/>
      <TodoList/>
    </StoreProvider>
  );
}

export default App;
