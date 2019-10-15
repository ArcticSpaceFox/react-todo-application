import { v4 } from "uuid";

export function todo(state = [], action) {
  switch (action.type) {
    case 'ADD':
      const newTodo = {
        "id": v4(),
        "value": action.value,
        "done": false
      }
      return state = [...state, newTodo]

    case 'DEL':
      state = state.filter(_todo => _todo !== action.todo)
      return state

    case 'TOGGLE':
     return state.map(todo => todo.id === action.todo.id ? {...todo, done: !todo.done} : todo)

    default:
      return state;
  }
}
