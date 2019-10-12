import React from 'react'

import Todo from "./todo";
import { observer } from 'mobx-react';

function TodoList(props) {
  const {todos, toggleDone, deleteTodo} = props.store

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
            <Todo key={todo.id} todo={todo} toggleDone={toggleDone} deleteTodo={deleteTodo}/>
          ))}
        </div>
      </section>
    </div>
  )
}

export default observer(TodoList)
