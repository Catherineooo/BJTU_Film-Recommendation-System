//signup.js
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { encoder } from "../../utils/passwordUtil";

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
		const hashedPassword = encoder(password);
		try {
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
				username: username,
				password: hashedPassword,
			});
			if (response.data.data.state === 1) {
				handleLoginVisible();
				toast.success(response.data.data.message, {
					position: 'top-center',
					autoClose: 1500,
					hideProgressBar: true,
					closeButton: false
				});
			} else {
				setErrormsg(response.data.data.message);
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
			{signupVisible && (
				<div className="auth-bg" onClick={handleSignupVisible}>
					<div className="cardContainer" onClick={handleContainerClick}>
						<div className="card">
							<p className="auth-title">SIGN UP</p>
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