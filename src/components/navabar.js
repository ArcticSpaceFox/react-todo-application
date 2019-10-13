import React, { useState } from 'react';

import { useStoreActions, useStoreState } from 'easy-peasy';

export default function Navbar() {
	const [menu, setMenu] = useState(false);
	const [value, setValue] = useState('');
  const [modal, setModal] = useState(false);

	const add = useStoreActions(actions => actions.todos.add);
	const { connect, disconnect } = useStoreActions(actions => actions.db);
	const isOnline = useStoreState(states => states.db.db.isOnline);
	const isLoading = useStoreState(states => states.db.isLoading);

	const toggleOnline = () => {
		if (isOnline) {
			disconnect();
		} else {
			connect();
		}
	};

	const addTodo = e => {
		e.preventDefault();
		setModal(false);
		add(value);
		setValue('');
	};

	return (
		<div>
			<div className='navbar has-shadow'>
				<div className='navbar-brand'>
					<div className='navbar-item'>
						<p className='title'>Easy Todo</p>
					</div>

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
					<div className='navbar-end'>
						<div className='navbar-item'>
							<div className='buttons'>
								<button
                  autoFocus
									onClick={() => setModal(true)}
									className={`button is-primary ${modal ? 'is-loading' : ''}`}
								>
									Add Todo
								</button>
								<button
									onClick={toggleOnline}
									className={`button ${isOnline ? 'is-light' : 'is-info'} ${
										isLoading ? 'is-loading' : ''
									}`}
								>
									{isOnline ? 'Stop sharing' : 'Start sharing'}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`modal ${modal ? 'is-active' : ''}`}>
				<div onClick={() => {setModal(false); setValue("")}} className='modal-background'></div>
				<div className='modal-content'>
					<form onSubmit={addTodo} className='field has-addons is-large'>
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
					onClick={() => {setModal(false); setValue("")}}
					className='modal-close is-large'
					aria-label='close'
				></button>
			</div>
		</div>
	);
}
