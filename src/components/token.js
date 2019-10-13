import React from 'react';

import { Link } from 'react-router-dom';

import { useStoreState } from 'easy-peasy';
import { encodeToken } from '../utils/dbaddrtoken';

export default function ControlCenter() {
  const db = useStoreState(states => states.db.db.db);
  
  const copyToken = () => {
    navigator.clipboard.writeText(encodeToken(db.id))
  }

	return (
		<div className='has-text-centered'>
			{db ? (
				<>
					<section className='hero has-text-centered is-info'>
						<div className='hero-body'>
							<p className='title is-1'>My Token</p>
						</div>
					</section>
					<section className='section'>
						<div className='container'>
							<div className='has-text-centered'>
								<div className='card'>
									<div className='card-header'>
										<p className='card-header-title'>Your Token:</p>
									</div>
									<div className='card-content'>
										<code>{encodeToken(db.id)}</code>
									</div>
									<div className='card-footer'>
										<Link to='/' className='card-footer-item has-text-info has-text-weight-bold' onClick={copyToken}>Copy</Link>
									</div>
								</div>
							</div>
						</div>
					</section>
				</>
			) : (
				<div className='hero is-fullheight is-danger'>
					<div className='hero-body'>
						<p className='title'>You don't have a Token yet</p>
					</div>
				</div>
			)}
			{/* <progress class='progress is-info' value='' max='100'/> */}
		</div>
	);
}
