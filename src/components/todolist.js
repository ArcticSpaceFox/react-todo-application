import React from 'react'

import { useStoreState, useStoreActions } from "easy-peasy";

import Todo from "./todo";

export default function TodoList() {
  // Database
  window.dbactions = useStoreActions(actions=>actions.db)
  window.dbstate = useStoreState(states => states.db)

  // Todo
  const {setFilter, toggleTodo, delTodo} = useStoreActions(actions => actions.todos)
  const {filteredTodos, count, filter} = useStoreState(states => states.todos)

  return (
    <div>
      <div className="hero is-info">
        <div className="hero-body has-text-centered">
          <p className="title is-1">{count} Todos</p>
        </div>
      </div>
      
      <section className="section">
        <div className="container">
          <input type="text" placeholder="Search..." value={filter} onChange={(e)=>setFilter(e.target.value)} className="input"/>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {filteredTodos.map(todo => (
            <Todo key={todo._id} todo={todo} toggleDone={toggleTodo} deleteTodo={() => delTodo(todo)}/>
          ))}
        </div>
      </section>
    </div>
  )
}
