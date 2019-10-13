import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { StoreProvider } from 'easy-peasy';
import { store } from './store';

import Navbar from './components/navabar';
import TodoList from './components/todolist';
import Dashboard from './components/token';
import Join from './components/join';

function App() {
	return (
		<StoreProvider store={store}>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/'>
						<TodoList />
					</Route>
					<Route path='/dash'>
						<Dashboard />
					</Route>
					<Route path='/join/:id' component={Join}></Route>
					<Route path='/join' component={Join}></Route>
				</Switch>
			</Router>
		</StoreProvider>
	);
}

export default App;
