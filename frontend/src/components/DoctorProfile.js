import React, { useEffect, useState, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import image from "../images/doctor.jpg";
import { Link, useHistory } from "react-router-dom";
// import DoctorData from "../jasonfiles/doctor.json";
import axios from "axios";
import Doctor from "./DoctorCards";
import { ProfileContext } from "../ProfileContext";
const DoctorProfile = () => {
	const ProfileTerm = useContext(ProfileContext);
	let history = useHistory();
	useEffect(() => {
		if (!localStorage.getItem("authToken")) {
			history.push("/login");
		}
	}, []);
	const DoctorData = JSON.parse(localStorage.getItem("doctor"));
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Img variant="top" src={image} />
			<Card.Body>
				<Card.Title>{DoctorData.name}</Card.Title>
				<Card.Title>{DoctorData.email}</Card.Title>

				<Link to="/Doctor" style={{ color: "#fff" }}>
					<Button variant="primary">Go to Home</Button>
				</Link>
				<Link to={`/FormAppointment`} style={{ color: "#fff" }}>
					<Button variant="primary">mak appointment</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default DoctorProfile;
