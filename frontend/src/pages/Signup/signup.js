//signup.js
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Signup({ signupVisible, toggleSignupVisible, toggleLoginVisible }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errormsg, setErrormsg] = useState('');

	useEffect(() => {
		if (errormsg) {
			toast.info(errormsg, {
				position: 'top-center',
				autoClose: 1500,
				hideProgressBar: true,
				closeButton: false
			});
			setErrormsg('');
		}
	}, [errormsg]);

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${process.env.BACKEND_API_URL}/signup`, {
				username,
				password,
			});
			if (response.data.message === '注册成功') {
				handleLoginVisible();
			} else {
				setErrormsg(response.data.message);
			}
		} catch (error) {
			if (error.response && error.response.status === 400) {
				setErrormsg(error.response.data.message);
			} else {
				setErrormsg('An unexpected error occurred. Please try again.');
			}
		}
	};

	const handleSignupVisible = () => {
		toggleSignupVisible();
	}

	const handleLoginVisible = () => {
		toggleLoginVisible();
	}

	const handleContainerClick = (event) => {
		// Prevent propagation of click event to parent elements
		event.stopPropagation();
	}

	return (
		<>
			<ToastContainer />
			{signupVisible && (
				<div className="auth-bg" onClick={handleSignupVisible}>
					<div class="cardContainer" onClick={handleContainerClick}>
						<div class="card">
							<p class="auth-title">SIGN UP</p>
							<form className="signup-form" onSubmit={handleSignup}>
								<input type="text" className="auth-input" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
								<input
									type="password"
									className="auth-input"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Password"
									required
								/>
								<button type="submit" className="login-btn">Sign Up</button>
							</form>
							<p className="auth-switch">
								Already Have Account ? <span className="switch-link" onClick={handleLoginVisible}>Login</span>
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Signup;