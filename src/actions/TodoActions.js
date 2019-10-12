export const add = (value) => {
  return {
    type: "ADD",
    value: value
  }
}

export const toggleTodo = (todo) => {
  return {
    type: "TOGGLE",
    todo: todo
  }
}

export const deleteTodo = (todo) => {
  return {
    type: "DEL",
    todo: todo
  }
}
