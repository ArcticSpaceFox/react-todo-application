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
	add: action((state, payload) => {
		state.items.push({
			id: Date.now(),
			value: payload,
			done: false
		});
	}),
	del: action((state, payload) => {
		state.items.splice(state.items.indexOf(payload), 1);
	}),
	toggle: action((state, payload) => {
		state.items = state.items.map(todo =>
			todo.id === payload.id ? { ...todo, done: !todo.done } : todo
		);
	})
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
  connect: thunk(async (actions, payload, {getState}) => {
    actions.isLoading()
    if (getState().db.isOnline) actions.offline()
    const [orbitdb, db] = await database(payload || "todo-app")
    console.log(db.address.toString());
    actions.online({
      orbitdb: orbitdb,
      db: db
    })
    actions.isLoadingDone()
  })
}