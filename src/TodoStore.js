import { observable, action } from "mobx";

export class Todo {
  @observable value
  @observable done

  constructor (value) {
    this.id = Date.now()
    this.value = value
    this.done = false
  }
}

export class TodoStore {
  @observable todos = []

  @action addTodo = (value) => {
    this.todos.push(new Todo(value))
  }
  @action toggleDone = (todo) => {
    this.todos[this.todos.indexOf(todo)].done = !this.todos[this.todos.indexOf(todo)].done
  }
  @action deleteTodo = (todo) => {
    this.todos = this.todos.filter(t => t !== todo)
  }
}
