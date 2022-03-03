import React, { useEffect, useState, useContext } from "react";

import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProfileContext } from "../ProfileContext";

const FormAppointment = ({ addAppointmenttHandler }) => {
	// const ProfileTerm = useContext(ProfileContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [date, setDate] = useState("");
	// const [doctorId, setDoctorId] = useState("");

	useEffect(() => {
		if (!localStorage.getItem("authToken")) {
			console.log("not author");
			window.location.replace("/login");
		}
	}, []);
	const add = (e) => {
		e.preventDefault();
		if (name === "" || email === "" || date === "") {
			alert("All the feilds are mandotary!");
			return;
		}

		const DoctorData = JSON.parse(localStorage.getItem("doctor"));
		console.log(DoctorData._id);
		// setDoctorId(DoctorData._id);
		const doctorId = DoctorData._id;
		console.log("hi", doctorId);
		addAppointmenttHandler({ name, email, date, doctorId });
	};

	return (
		<div className="container" style={{ width: "900px", marginTop: "50px" }}>
			<Form onSubmit={add}>
				<h2>Make Appointement</h2>

				<Form.Group className="mb-3" controlId="formBasicName">
					<Form.Control
						placeholder="Enter name"
						type="text"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control
						type="email"
						placeholder="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</Form.Group>
				{/* <Link to={`/DoctorAppointmentList/`}> */}
				<Button variant="primary" type="submit">
					Submit
				</Button>
				{/* </Link> */}
				<Link to="/home">
					<Button variant="primary" type="submit">
						got to home
					</Button>
				</Link>
			</Form>
		</div>
	);
};

export default FormAppointment;
