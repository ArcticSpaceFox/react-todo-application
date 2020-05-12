import React from 'react'

import { v4 } from "uuid";

import Todo from "./todo";
import { observer } from 'mobx-react';

export default function function TodoList(props) {
  const { todos, toggleDone, deleteTodo, filteredTodos } = props.store


  return (
    <div>
      <div className="hero is-info">
        <div className="hero-body has-text-centered">
          <p className="title is-1">{todos.length} Todos</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <input className="input" placeholder="Search..." type="text" value={props.store.filter} onChange={(e) => props.store.filter = e.target.value} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          {filteredTodos.map(todo => (
            <Todo key={todo.id} todo={todo} toggleDone={toggleDone} deleteTodo={deleteTodo} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default observer(TodoList)
