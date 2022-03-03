import React, { useState, useEffect, useContext } from "react";
import jwt from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";
import { RegisterContext } from "../RegisterContext";
const LoginScreen = ({ history }) => {
	const RegisterTerm = useContext(RegisterContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			if (localStorage.getItem("isAdmin") === "true") {
				history.push("/DoctorAppointmentList");
			} else {
				history.push("/Doctor");
			}
		}
	}, [history]);

	const loginHandler = async (e) => {
		e.preventDefault();
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const { data } = await axios.post(
				"http://localhost:8002/auth",
				{
					email,
					password,
					// isAdimn: RegisterContext.isAdmin,
				},
				config
			);
			localStorage.setItem("authToken", data);
			const user = jwt(data);
			localStorage.setItem("isAdmin", user.isAdmin);
			localStorage.setItem("id", user._id);

			if (localStorage.getItem("isAdmin") === "true") {
				history.push("/DoctorAppointmentList");
				window.location.reload();
			} else {
				history.push("/Doctor");
				window.location.reload();
			}
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError("");
			}, 5000);
		}
	};

	return (
		<div className="login-screen">
			<form className="login-screen__form" onSubmit={loginHandler}>
				<h3 className="login-screen__title">Login</h3>
				{error && <span className="error-message"> {error}</span>}

				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						required
						id="email"
						placeholder="Enter Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						tabIndex={1}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password">
						Password:
						<Link
							to="/forgotpassword"
							className="login-screen__forgotpassword"
							tabIndex={4}
						>
							Forgot Password?
						</Link>
					</label>
					<input
						type="password"
						required
						id="password"
						placeholder="Enter Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						tabIndex={2}
					/>
				</div>

				<button type="Submit" className="btn btn-primary" tabIndex={3}>
					Login
				</button>
				<span className="login-screen__subtext">
					Do not have an account? <Link to="/register">Register</Link>
				</span>
			</form>
		</div>
	);
};

export default LoginScreen;
