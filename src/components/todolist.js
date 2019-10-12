import React from 'react'

import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../actions/TodoActions";

import Todo from "./todo";

export default function TodoList() {
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos)

  // toggleDone
  const toggleDone = (todo) => {
    // const changedTodo = todo
    // changedTodo.done = !changedTodo.done
    // todos[todos.indexOf(todo)] = changedTodo
    // setTodos([...todos])
    dispatch(toggleTodo(todo))
  }

  return (
    <div>
      <div className="hero is-info">
        <div className="hero-body has-text-centered">
          <p className="title is-1">{todos.length} Todos</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {todos.map(todo => (
            <Todo key={todo.id} todo={todo} toggleDone={toggleDone} deleteTodo={() => dispatch(deleteTodo(todo))}/>
          ))}
        </div>
      </section>
    </div>
  )
}
