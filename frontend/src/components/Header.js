import React, { useEffect, useContext } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { RegisterContext } from "../RegisterContext";
const Header = () => {
	const RegisterTerm = useContext(RegisterContext);
	let history = useHistory();
	useEffect(() => {
		if (!localStorage.getItem("authToken")) {
			console.log("not author");
			history.push("/login");
		}
	}, []);
	const logoutHandler = () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("isAdmin");
		localStorage.removeItem("id");
		history.push("/login");
		window.location.reload();
	};

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand>Appointment</Navbar.Brand>
				{localStorage.getItem("authToken") && (
					<>
						<Navbar.Collapse id="responsive-navbar-nav">
							{localStorage.getItem("isAdmin") === "true" ? (
								<Link to="/DoctorAppointmentList">DoctorAppointmentList</Link>
							) : (
								<>
									<Link to="/Doctor">Doctor </Link>
									{/* <Link to="/DoctorProfile">Doctor Profile</Link> */}
									<Link to="/FormAppointment">Appointement</Link>
								</>
							)}
						</Navbar.Collapse>
						<Link eventKey={2} to="/logout" onClick={logoutHandler}>
							logout
						</Link>
					</>
				)}
			</Container>
		</Navbar>
	);
};

export default Header;
