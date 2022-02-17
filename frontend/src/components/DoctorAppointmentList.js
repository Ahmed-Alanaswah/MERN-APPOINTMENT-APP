import React from "react";
import { Table, Button } from "react-bootstrap";
import AppointmentList from "../jasonfiles/appointments.json";

import { Link } from "react-router-dom";
function DoctorAppointmentList(props) {
	const deleteContactHandler = (id) => {
		props.getContactId(id);
	};
	return (
		<div>
			<div className="container" style={{ marginTop: "50px" }}>
				<Link to="/" style={{ color: "#fff" }}>
					<Button style={{ marginBottom: "50px" }} variant="primary">
						Go to Home
					</Button>
				</Link>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Date</th>
							<th>delete</th>
							<th>accept</th>
						</tr>
					</thead>
					<tbody>
						{props.appointments.map((data) => {
							return (
								<>
									<tr>
										<td>{data.id}</td>
										<td>{data.name}</td>
										<td>{data.email}</td>
										<td>{data.date}</td>
										<td>
											<Button onClick={() => deleteContactHandler(data._id)}>
												delete
											</Button>
										</td>
										<td>
											<Button>accept</Button>
										</td>
									</tr>
								</>
							);
						})}
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default DoctorAppointmentList;
