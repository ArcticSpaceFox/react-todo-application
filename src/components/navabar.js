import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useStoreActions, useStoreState } from 'easy-peasy';

export default function Navbar() {
	const [menu, setMenu] = useState(false);
	const [value, setValue] = useState('');
	const [modal, setModal] = useState(false);

	const {addTodo, reload} = useStoreActions(actions => actions.todos);
	const connect = useStoreActions(actions => actions.db.connect);
	const db = useStoreState(states => states.db.db.db);
	const isOnline = useStoreState(states => states.db.db.isOnline);

	useEffect(() => {
		if (db) {
			db.events.on('replicated', () => reload(db))
		} else {
			connect()
		}
	}, [isOnline])

	const addNewTodo = e => {
		e.preventDefault();
		setModal(false);
		addTodo(value);
		setValue('');
	};

	return (
		<div>
			<div className='navbar has-shadow'>
				<div className='navbar-brand'>
					<Link to='/' className='navbar-item'>
						<p className='title'>Easy Todo</p>
					</Link>

					<p
						role='button'
						onClick={() => setMenu(!menu)}
						className={`navbar-burger burger ${menu ? 'is-active' : ''}`}
						aria-label='menu'
						aria-expanded='false'
						data-target='navbarBasicExample'
					>
						<span aria-hidden='true'></span>
						<span aria-hidden='true'></span>
						<span aria-hidden='true'></span>
					</p>
				</div>

				<div className={`navbar-menu ${menu ? 'is-active' : ''}`}>
					<div className='navbar-start'>
						<Link className='navbar-item' to='/dash'>
							My Token
						</Link>
					</div>

					<div className='navbar-end'>
						<div className='navbar-item'>
							<div className='buttons'>
								<button
                  autoFocus
                  disabled={!isOnline}
									onClick={() => setModal(true)}
									className={`button is-primary ${modal ? 'is-loading' : ''}`}
								>
									Add Todo
								</button>
								<Link to='/join'
									className="button is-info"
								>
                  Join
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`modal ${modal ? 'is-active' : ''}`}>
				<div
					onClick={() => {
						setModal(false);
						setValue('');
					}}
					className='modal-background'
				></div>
				<div className='modal-content'>
					<form onSubmit={addNewTodo} className='field has-addons is-large'>
						<p className='control is-expanded'>
							<input
								value={value}
								type='text'
								onChange={e => setValue(e.target.value)}
								className='input is-large'
							/>
						</p>
						<p className='control'>
							<button className='button is-large is-info has-text-weight-bold'>
								Add Todo
							</button>
						</p>
					</form>
				</div>
				<button
					onClick={() => {
						setModal(false);
						setValue('');
					}}
					className='modal-close is-large'
					aria-label='close'
				></button>
			</div>
		</div>
	);
}
