//login.js
import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import './login.css';

function Login({ loginVisible, toggleLoginVisible, toggleSignupVisible }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
        console.log("login u="+ username + ' p='+ password)
		try {
			const response = await axios.post('http://localhost:8000/login', {
                //`${process.env.VUE_APP_BACKEND_API_URL}/login`
				username: username,
				password,
			});
            console.log(response)
			if (response.data.data.state === 1) {
                console.log("登录成功")
				const token = response.data.token;
				localStorage.setItem('token', token); // Store token in localStorage
				console.log(response.data);
				window.location = '/';
			} else {
                console.log("登录失败")
				toast.info(response.data.message, {
					position: 'top-center',
					autoClose: 1500,
					hideProgressBar: true,
					closeButton: false
				});
			}
		} catch (error) {
			if (error.response && error.response.status === 400) {
				toast.info(error.response.message, {
					position: 'top-center',
					autoClose: 1500,
					hideProgressBar: true,
					closeButton: false
				});
			} else {
				toast.error(error.response.message, {
					position: 'top-center',
					autoClose: 1500,
					hideProgressBar: true,
					closeButton: false
				});
			}
		}
	};

	const handleLoginVisible = () => {
		toggleLoginVisible();
	}

	const handleSignupVisible = () => {
		toggleSignupVisible();
	}

	const handleContainerClick = (event) => {
		// Prevent propagation of click event to parent elements
		event.stopPropagation();
	}

	return (
		<>
			<ToastContainer />
			{loginVisible && (
				<div className="auth-bg" onClick={handleLoginVisible}>
					<div className="cardContainer" onClick={handleContainerClick}>
						<div className="card">
							<p className="auth-title">LOGIN</p>
							<form className='login-form' onSubmit={handleLogin}>
								<input type="username" className="auth-input" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
								<input
									type="password"
									className="auth-input"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Password"
									required
								/>
								<button type='submit' className="login-btn">Sign In</button>
							</form>
							<p className="auth-switch">
								Don't Have Account ? <span className="switch-link" onClick={handleSignupVisible}>Sign Up</span>
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Login;
