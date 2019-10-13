import { action, thunk, computed } from 'easy-peasy';
import database from './orbit';
import { RegExp } from 'core-js';

export const TodoModel = {
  items: [],
  filter: "",
  count: computed(state => state.items.length),
  filteredTodos: computed(state => {
    const matchCase = new RegExp(state.filter, "i")
    return state.items.filter(todo => !state.filter || matchCase.test(todo.value))
  }),
  setFilter: action((state, payload) => {
    state.filter = payload
  }),
  reload: action((state, payload) => {
    state.items = payload.query((doc) => doc)
  }),
  addTodo: thunk(async (actions, payload, {getStoreState}) => {
    const db = getStoreState().db.db.db
    await db.put({
			_id: Date.now(),
			value: payload,
			done: false
    })
    actions.reload(db)
  }),
  delTodo: thunk(async (actions, payload, {getStoreState}) => {
    const db = getStoreState().db.db.db
    await db.del(payload._id)
    actions.reload(db)
  }),
  toggleTodo: thunk(async(actions, payload, {getStoreState, getState}) => {
    const db = getStoreState().db.db.db
    const updatedTodo = getState().items.filter(t => t === payload ? t : null)[0]
    updatedTodo.done = !payload.done
    await db.put(updatedTodo)
    actions.reload(db)
  }),
};

export const TodoDB = {
  db: {
    isOnline: false,
    isLoading: false,
    orbitdb: null,
    db: null
  },
  online: action((state, payload) => {
    state.db = {
      isOnline: true,
      orbitdb: payload.orbitdb,
      db: payload.db
    }
  }),
  offline: action((state) => {
    state.db = {
      isOnline: false,
      orbitdb: null,
      db: null
    }
  }),
  isLoading: action((state) => state.isLoading = true),
  isLoadingDone: action((state) => state.isLoading = false),
  disconnect: thunk(async (actions, payload, {getState}) => {
    actions.isLoading()
    await getState().db.orbitdb.disconnect()
    actions.offline()
    actions.isLoadingDone()
  }),
  connect: thunk(async (actions, payload, {getState, getStoreActions}) => {
    actions.isLoading()
    if (getState().db.isOnline) actions.disconnect()
    const [orbitdb, db] = await database(payload || "todo-app")
    await db.load()
    getStoreActions().todos.reload(db)
    actions.online({
      orbitdb: orbitdb,
      db: db
    })
    actions.isLoadingDone()
  })
}