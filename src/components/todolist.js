import React, {useContext, useEffect} from 'react'

import { TodoContext } from "../TodoContext";

import Todo from "./todo";

// Here we emulate an API call using a Promise
const APItodos = () => {
  return new Promise(function(resolve, reject) {
    setTimeout(()=>{
      resolve([
        {
          "id": Date.now(),
          "value": "I came later from an API ... kinda",
          "done": false
        },
        {
          "id": Date.now() + 1,
          "value": "You could implement a real API here as well!",
          "done": true  
        }
      ])
    }, 3000);
  })
}

export default function TodoList() {
  const [todos, setTodos] = useContext(TodoContext);

  // This is called each time a item in the array, passed as second arg changes.
  // Since it is empty it will never change and equals to a componentDidMount.
  // We can use this to initilize our todos with the just loaded ones. :)
  // 
  // I hope this answers Issue #2 by captmomo 
  useEffect(() => {
    APItodos().then((t) => setTodos([...todos].concat(t)))
    return;
  }, [])

  // toggleDone
  const toggleDone = (todo) => {
    todos.map(_t => _t === todo ? _t.done = !todo.done : _t)
    setTodos([...todos])
  } 
  // delete
  const deleteTodo = (todo) => {
    const _todos = todos.filter(_todo => _todo !== todo)
    setTodos(_todos)
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
            <Todo key={todo.id} todo={todo} toggleDone={toggleDone} deleteTodo={deleteTodo}/>
          ))}
        </div>
      </section>
    </div>
  )
}
