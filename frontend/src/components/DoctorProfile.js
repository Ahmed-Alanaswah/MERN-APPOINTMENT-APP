import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import image from "../images/doctor.jpg";
import { Link } from "react-router-dom";
// import DoctorData from "../jasonfiles/doctor.json";
import axios from "axios";
import Doctor from "./DoctorCards";

const DoctorProfile = ({ DoctorData }) => {
	// const LOCAL_STORAGE_KEY = "profiledata";

	// useEffect(() => {
	// 	const retriveProducts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
	// }, []);

	// useEffect(() => {
	// 	if (DoctorData) {
	// 		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DoctorData));
	// 	}
	// 	// only store the state if products exists and it's length is greater than 0
	// }, [DoctorData]);

	// const localData = JSON.parse(localStorage[LOCAL_STORAGE_KEY]);
	// console.log(localData);
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Img variant="top" src={image} />
			<Card.Body>
				<Card.Title>{DoctorData.name}</Card.Title>
				<Card.Title>{DoctorData.email}</Card.Title>

				<Link to="/" style={{ color: "#fff" }}>
					<Button variant="primary">Go to Home</Button>
				</Link>
				<Link to="/FormAppointment" style={{ color: "#fff" }}>
					<Button variant="primary">mak appointment</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default DoctorProfile;
