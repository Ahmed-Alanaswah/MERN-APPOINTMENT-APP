import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import AppointmentList from "../jasonfiles/appointments.json";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
function DoctorAppointmentList(props) {
	let history = useHistory();
	useEffect(() => {
		if (!localStorage.getItem("authToken")) {
			console.log("not author");
			history.push("/login");
		}
	}, []);
	const deleteContactHandler = (id) => {
		props.getContactId(id);
	};
	return (
		<div>
			<div className="container" style={{ marginTop: "50px" }}>
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
										<td>{data.doctorId}</td>
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
