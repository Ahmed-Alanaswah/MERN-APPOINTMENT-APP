import "./App.css";
import Doctor from "./components/DoctorCards";
import DoctorProfile from "./components/DoctorProfile";
import User from "./components/User";
import FormAppointment from "./components/FormAppointment";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DoctorAppointmentList from "./components/DoctorAppointmentList";
import { DoctorRender } from "./components/DoctorRender";
import DoctorCard from "./components/DoctorCards";
import { useState, useEffect } from "react";
import axios from "axios";
import doctorsData from "./jasonfiles/doctor.json";
// import uuidv4, { uuid } from "uuidv4";

function App() {
	const [DoctorData, setDoctorData] = useState("");
	const [DoctorList, setDoctorList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [appointments, setAppointment] = useState([]);

	useEffect(async () => {
		const response = await axios.get("http://localhost:8002/Doctor");
		setDoctorList(response.data);
	}, []);

	useEffect(async () => {
		const response = await axios.get("http://localhost:8002/appointment");
		setAppointment(response.data);
	}, []);

	console.log(DoctorList);
	const removeContactHandler = async (id) => {
		await axios.delete(`http://localhost:8002/appointment/${id}`);
		const newContactList = appointments.filter((appointment) => {
			return appointment._id !== id;
		});

		setAppointment(newContactList);
	};

	const addAppointmenttHandler = async (appointment) => {
		const request = {
			// id: uuidv4(),
			...appointment,
		};

		const response = await axios.post(
			"http://localhost:8002/appointment",
			request
		);
		setAppointment([...appointments, response.data]);
	};

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/Doctor">
						<input
							style={{ margin: "50px" }}
							type="text"
							placeholder="search..."
							onChange={(e) => {
								setSearchTerm(e.target.value);
							}}
						/>

						<div className="row" style={{ textAlign: "center" }}>
							<DoctorCard
								setDoctorData={setDoctorData}
								setDoctorList={setDoctorList}
								DoctorList={DoctorList}
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
							/>
						</div>
					</Route>
					<Route exact path="/DoctorProfile/:id">
						<DoctorProfile
							DoctorData={DoctorData}
							setDoctorData={setDoctorData}
						/>
					</Route>
					<Route exact path="/FormAppointment">
						<FormAppointment
							addAppointmenttHandler={addAppointmenttHandler}
							DoctorData={DoctorData}
						/>
					</Route>
					<Route exact path="/DoctorAppointmentList">
						<DoctorAppointmentList
							appointments={appointments}
							getContactId={removeContactHandler}
						/>
					</Route>
					<Route exact path="/">
						<User />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
