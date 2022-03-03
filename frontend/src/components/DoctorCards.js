import React, { useState, useEffect, useContext } from "react";
import Doctors from "../jasonfiles/doctor.json";
import { Card, Button, Row } from "react-bootstrap";
import { Redirect, Link, useHistory } from "react-router-dom";
import { ProfileContext } from "../ProfileContext";

//do something...

const Doctor = ({ setDoctorData, searchTerm, DoctorList, DoctorData }) => {
	const ProfileTerm = useContext(ProfileContext);
	let history = useHistory();
	useEffect(() => {
		if (!localStorage.getItem("authToken")) {
			console.log("not author");
			history.push("/login");
		}
	}, []);

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

					<Link className="button " to={`/user/${doctor._id}`}>
						<Button
							variant="primary"
							onClick={() => ProfileTerm.showProfilehundler(doctor._id)}
						>
							DoctorProfile
						</Button>
					</Link>
				</Card.Body>
			</Card>
		);
	});
};

export default Doctor;
