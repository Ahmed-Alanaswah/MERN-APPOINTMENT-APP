import React, { Component } from "react";

import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export class FormAppointment extends Component {
	state = {
		name: "",
		email: "",
		date: "",
	};

	add = (e) => {
		e.preventDefault();
		if (
			this.state.name === "" ||
			this.state.email === "" ||
			this.state.date === ""
		) {
			alert("All the feilds are mandotary!");
			return;
		}
		this.props.addAppointmenttHandler(this.state);
		this.setState({ name: "", email: "", date: "" });
		// this.props.history.push("/");
	};

	render() {
		return (
			<div className="container" style={{ width: "900px", marginTop: "50px" }}>
				<Form onSubmit={this.add}>
					<h2>Make Appointement</h2>

					<Form.Group className="mb-3" controlId="formBasicName">
						<Form.Control
							placeholder="Enter name"
							type="text"
							name="name"
							value={this.state.name}
							onChange={(e) => this.setState({ name: e.target.value })}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Control
							type="email"
							placeholder="email"
							value={this.state.email}
							onChange={(e) => this.setState({ email: e.target.value })}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Control
							type="date"
							value={this.state.date}
							onChange={(e) => this.setState({ date: e.target.value })}
						/>
					</Form.Group>
					<Link to={`/DoctorAppointmentList/`}>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Link>
					<Link to="/">
						<Button variant="primary" type="submit">
							got to home
						</Button>
					</Link>
				</Form>
			</div>
		);
	}
}

export default FormAppointment;
