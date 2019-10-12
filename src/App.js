import React from 'react';

import Navbar from "./components/navabar";
import TodoList from "./components/todolist";
import { TodoStore } from './TodoStore';

function App() {
  const store = new TodoStore()
  return (
    <div>
      <Navbar store={store}/>
      <TodoList store={store}/>
    </div>
  );
}

export default App;
