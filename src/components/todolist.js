import React from 'react'

import { useStoreState, useStoreActions } from "easy-peasy";

import Todo from "./todo";

export default function TodoList() {
  const todos = useStoreState(states => states.todos.items)
  const del = useStoreActions(actions => actions.todos.del)
  const toggle = useStoreActions(actions => actions.todos.toggle)
  // toggleDone
  const toggleDone = (todo) => {
    // const changedTodo = todo
    // changedTodo.done = !changedTodo.done
    // todos[todos.indexOf(todo)] = changedTodo
    // setTodos([...todos])
    toggle(todo)
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
            <Todo key={todo.id} todo={todo} toggleDone={toggleDone} deleteTodo={() => del(todo)}/>
          ))}
        </div>
      </section>
    </div>
  )
}
