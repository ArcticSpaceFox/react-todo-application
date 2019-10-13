import React, {useState} from 'react';

import { withRouter } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import { decodeToken } from '../utils/dbaddrtoken';

const Join = ({history}) => {
  const [valid, setValid] = useState(false)
  const [token, setToken] = useState("")

	const { connect } = useStoreActions(actions => actions.db);

  const checkValidity = () => {
    if (!decodeToken(token)) {
      setValid(false)
      return false
    }
    setValid(true)
    return true
  }
  const handleChange = (e) => {
    setToken(e.target.value)
    checkValidity()
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!checkValidity()) return
    connect(decodeToken(token))
    history.push('/')
  }

	return (
		<div>
			<section className='hero is-info'>
				<div className='hero-body has-text-centered'>
					<p className='title is-1'>JOIN</p>
				</div>
			</section>

			<div className='section'>
				<div className='container'>
					<form className='hero is-medium' onSubmit={handleSubmit}>
						<div className='hero-body'>
							<div className='field has-addons'>
								<div className='control is-expanded'>
									<input
                    value={token}
                    onChange={handleChange}
										placeholder='Enter your token...'
										type='text'
										className='input'
									/>
									<p className={`help ${valid ? "is-success" : "is-danger"}`}>{valid ? "The token is valid" : "Please enter a valid token"}</p>
								</div>
								<div className='control'>
									<button className='button is-info'>Join</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default withRouter(Join)
