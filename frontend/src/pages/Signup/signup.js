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
			const response = await axios.post('http://localhost:8000/register', {//`${process.env.VUE_APP_BACKEND_API_URL}/signup`
				username: username,
				password: password,
			});
            console.log(response)
			if (response.data.data.state === 1) {
                console.log("注册成功")
				handleLoginVisible();
			} else {
                console.log("注册失败")
				setErrormsg(response.data.data.message);
			}
		} catch (error) {
			if (error.response && error.response.status === 400) {
				setErrormsg(error.response.data.data.message);
			} else {
				setErrormsg('阿哦 出错了喵');
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