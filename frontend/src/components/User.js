import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const User = () => {
	return (
		<div>
			<Link to="/Doctor">
				<Button variant="primary" style={{ margin: "15px" }}>
					Doctor{" "}
				</Button>
			</Link>

			<Link to="/DoctorProfile">
				<Button variant="primary" style={{ margin: "15px" }}>
					Doctor Profile
				</Button>
			</Link>

			<Link to="/FormAppointment">
				<Button variant="primary" style={{ margin: "15px" }}>
					Appointement{" "}
				</Button>
				<Link to="/DoctorAppointmentList">
					<Button variant="primary" style={{ margin: "15px" }}>
						DoctorAppointmentList
					</Button>
				</Link>
			</Link>
		</div>
	);
};

export default User;
