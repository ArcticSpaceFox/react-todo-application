import React from 'react';

import { TodoProvider } from "./TodoContext";

import Navbar from "./components/navabar";
import TodoList from "./components/todolist";

function App() {
  return (
    <TodoProvider>
      <Navbar/>
      <TodoList/>
    </TodoProvider>
  );
}

export default App;
