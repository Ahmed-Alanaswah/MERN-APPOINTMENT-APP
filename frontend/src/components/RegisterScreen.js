import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";
import { RegisterContext } from "../RegisterContext";

const RegisterScreen = ({ history }) => {
	const RegisterTerm = useContext(RegisterContext);
	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			if (localStorage.getItem("isAdmin") === "true") {
				history.push("/DoctorAppointmentList");
			} else {
				history.push("/Doctor");
			}
		}
	}, [history]);

	const registerHandler = async (e) => {
		e.preventDefault();
		const config = {
			header: {
				"Content-Type": "applicattion/json",
			},
		};

		if (RegisterTerm.password !== RegisterTerm.confirmpassword) {
			RegisterTerm.setPassword("");
			RegisterTerm.setConfirmPassword("");
			setTimeout(() => {
				RegisterTerm.setError("");
			}, 5000);
			return RegisterTerm.setError("Password do not match");
		}

		try {
			const { data } = await axios.post(
				"http://localhost:8002/user?isAdmin",
				{
					name: RegisterTerm.name,
					email: RegisterTerm.email,
					password: RegisterTerm.password,
					isAdmin: RegisterTerm.isAdmin,
				},
				config
			);
			localStorage.setItem("authToken", data.token);
			localStorage.setItem("isAdmin", RegisterTerm.isAdmin);

			if (localStorage.getItem("isAdmin") === "true") {
				history.push("/DoctorAppointmentList");
			} else {
				history.push("/Doctor");
			}

			window.location.reload(true);
		} catch (error) {
			RegisterTerm.setError(error.response.data.error);
			setTimeout(() => {
				RegisterTerm.setError("");
			}, 5000);
		}
	};
	return (
		<div className="register-screen">
			<form className="register-screen__form" onSubmit={registerHandler}>
				<h3 className="register-screen__title">Register</h3>
				{RegisterTerm.error && (
					<span className="error-message"> {RegisterTerm.error}</span>
				)}
				<div className="form-group">
					<label htmlFor="name">Username:</label>
					<input
						type="text"
						required
						id="name"
						placeholder="Enter Username"
						value={RegisterTerm.name}
						onChange={(e) => RegisterTerm.setName(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						required
						id="email"
						placeholder="Enter Email"
						value={RegisterTerm.email}
						onChange={(e) => RegisterTerm.setEmail(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						required
						id="password"
						placeholder="Enter Password"
						value={RegisterTerm.password}
						onChange={(e) => RegisterTerm.setPassword(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="confirmpassword">Confirm Password:</label>
					<input
						type="password"
						required
						id="confirmpassword"
						placeholder="Confirm Password"
						value={RegisterTerm.confirmpassword}
						onChange={(e) => RegisterTerm.setConfirmPassword(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<select
						onChange={(e) => RegisterTerm.setAdmin(Boolean(e.target.value))}
					>
						<option value={false}>User</option>
						<option value={true}>Doctor</option>
					</select>
				</div>

				<button type="Submit" className="btn btn-primary">
					Register
				</button>
				<span className="register-screen__subtext">
					Already have an account? <Link to="/login">Login</Link>
				</span>
			</form>
		</div>
	);
};

export default RegisterScreen;
