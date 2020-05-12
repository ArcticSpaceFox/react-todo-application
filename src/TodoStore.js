import { observable, action, computed } from "mobx";
import { v4 } from "uuid";

export class Todo {
  @observable value
  @observable done

  constructor (value) {
    this.id = v4()
    this.value = value
    this.done = false
  }
}

export class TodoStore {
  @observable todos = []
  @observable filter = ""

  @action addTodo = (value) => {
    this.todos.push(new Todo(value))
  }
  @action toggleDone = (todo) => {
    this.todos[this.todos.indexOf(todo)].done = !this.todos[this.todos.indexOf(todo)].done
  }
  @action deleteTodo = (todo) => {
    this.todos = this.todos.filter(t => t !== todo)
  }

  @computed get filteredTodos () {
    const matchCase = new RegExp(this.filter, "i")
    return this.todos.filter(todo=> !this.filter || matchCase.test(todo.value))
  }
}
