import React from 'react';

import { Provider } from "react-redux";

import Navbar from "./components/navabar";
import TodoList from "./components/todolist";

import {allReducers} from "./reducer";
import { createStore } from 'redux';

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

function App() {
  return (
    <Provider store={store}>
      <Navbar/>
      <TodoList/>
    </Provider>
  );
}

export default App;
