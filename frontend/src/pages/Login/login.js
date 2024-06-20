//login.js
import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import './login.css';
import { encoder } from "../../utils/passwordUtil";

function Login({ loginVisible, toggleLoginVisible, toggleSignupVisible }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
    // console.log("login u="+ username + ' p='+ password)
		// console.log(process.env.REACT_APP_BACKEND_URL)
		const hashedPassword = encoder(password);
		console.log(hashedPassword);
		try {
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
				username: username,
				password: hashedPassword,
			});
      console.log(response)
			if (response.data.data.state === 1) {
        console.log("登录成功")
				const token = response.data.data.user.token;
				localStorage.setItem('token', token); // Store token in localStorage
				console.log(response.data);
				toast.success(response.data.data.message, {
					position: 'top-center',
					autoClose: 1500,
					hideProgressBar: true,
					closeButton: false
				});
				window.location.reload();
			} else {
        console.log("登录失败")
				toast.info(response.data.data.message, {
					position: 'top-center',
					autoClose: 1500,
					hideProgressBar: true,
					closeButton: false
				});
			}
		} catch (error) {
			if (error.response && error.response.status === 401) {
				toast.error('用户名或密码错误', {
					position: 'top-center',
					autoClose: 1500,
					hideProgressBar: true,
					closeButton: false
				});
			} else {
				toast.error('Internal server error', {
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
								<button type='submit' className="login-btn">登录</button>
							</form>
							<p className="auth-switch">
								还没有账户 ? <span className="switch-link" onClick={handleSignupVisible}>注册</span>
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Login;
