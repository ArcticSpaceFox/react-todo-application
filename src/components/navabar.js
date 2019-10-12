import React, { useState } from 'react'
import { observer } from 'mobx-react'

function Navbar(props) {
  const [menu, setMenu] = useState(false)
  const [value, setValue] = useState("")
  
  const {addTodo} = props.store

  const prepareAddTodo = (e) => {
    e.preventDefault()
    addTodo(value)
    setValue("")
  }

  return (
    <div className="navbar has-shadow">
      <div className="navbar-brand">
        <div className="navbar-item">
          <p className="title">Easy Todo</p>
        </div>

        <a role="button" onClick={() => setMenu(!menu)} className={`navbar-burger burger ${menu ? "is-active" : ""}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${menu ? "is-active" : ""}`}>
        <div className="navbar-end">
          <div className="navbar-item">
            <form onSubmit={prepareAddTodo} className="field has-addons">
              <p className="control is-expanded">
                <input value={value} type="text" onChange={(e) => setValue(e.target.value)} className="input" />
              </p>
              <p className="control">
                <button className="button is-info has-text-weight-bold">
                  Add Todo
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Navbar)
