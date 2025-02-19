import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import superagent from 'superagent';
import app from '../../base';

const SignUp = ({ history }) => {
	const handleSignUp = useCallback(async event => {
		event.preventDefault();
		const { email, password } = event.target.elements;
		try {
			await app
				.auth()
				.createUserWithEmailAndPassword(email.value, password.value)
				.then(res => {
					console.log('User: ', res.user);
					superagent
						.post(`http://localhost:5000/api/user/${res.user.uid}`)
						.then(res => console.log(res))
						.catch(err => console.log("Error saving user: ", err));
				});
			history.push('/');
		} catch (error) {
			alert(error);
		}
	}, [history]);

	return (
		<div className='auth-container'>
			<div className='auth-modal'>
				<h1>Sign Up</h1>
				<form onSubmit={handleSignUp}>
					<label>
						Email:
			<input name='email' type='email' placeholder='Email' />
					</label>
					<label>
						Password:
			<input name='password' type='password' placeholder='Password' />
					</label>
					<br />
					<button className='btn btn-info auth-button' type='submit'>Sign Up</button>
				</form>
				<Link to='/login'>
					<button className='btn btn-secondary auth-button'>
						Login
		  </button>
				</Link>
			</div>
		</div>
	)
};

export default withRouter(SignUp);


