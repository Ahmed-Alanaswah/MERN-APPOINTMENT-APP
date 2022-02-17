import React, { useState, useEffect } from "react";
import Doctors from "../jasonfiles/doctor.json";
import { Card, Button, Row } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import DoctorProfile from "./DoctorProfile";
import axios from "axios";

//do something...

const Doctor = ({ setDoctorData, searchTerm, DoctorList, setDoctorList }) => {
	console.log(DoctorList);
	function showProfile(doctor) {
		setDoctorData(doctor);
	}

	return DoctorList.filter((doctor) => {
		if (searchTerm === "") {
			return doctor;
		} else if (doctor.name.toLowerCase().includes(searchTerm.toLowerCase())) {
			return doctor;
		}
	}).map((doctor) => {
		return (
			<Card key={doctor.id} style={{ width: "18rem", margin: "15px" }}>
				<Card.Body>
					<Card.Title>{doctor.name}</Card.Title>
					<Card.Title>{doctor.email}</Card.Title>

					<Link className="button " to={`/DoctorProfile/${doctor._id}`}>
						<Button variant="primary" onClick={() => showProfile(doctor)}>
							DoctorProfile
						</Button>
					</Link>
				</Card.Body>
			</Card>
		);
	});
};

export default Doctor;
