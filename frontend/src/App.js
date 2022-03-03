import "./App.css";
import DoctorProfile from "./components/DoctorProfile";
import Header from "./components/Header";
import FormAppointment from "./components/FormAppointment";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DoctorAppointmentList from "./components/DoctorAppointmentList";
import DoctorCard from "./components/DoctorCards";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import { RegisterContext } from "./RegisterContext";
import { ProfileContext } from "./ProfileContext";
// import uuidv4, { uuid } from "uuidv4";

function App() {
	const RegisterTerm = useContext(RegisterContext);
	const ProfileTerm = useContext(ProfileContext);
	const [DoctorData, setDoctorData] = useState("");
	const [DoctorList, setDoctorList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [appointments, setAppointment] = useState([]);
	// const [doctorId, setDoctorId] = useState(ProfileTerm.DoctorData.doctorId);

	useEffect(async () => {
		const response = await axios.get("http://localhost:8002/user");

		const doctorList = response.data.filter((data) => {
			return data.isAdmin === true;
		});
		setDoctorList(doctorList);
	}, []);

	useEffect(async () => {
		let doctorId = localStorage.getItem("id");
		console.log(doctorId);

		const { data } = await axios.get(
			`http://localhost:8002/appointment?doctor_Id=${doctorId}`
		);

		setAppointment(data);
	}, []);

	const removeContactHandler = async (id) => {
		await axios.delete(`http://localhost:8002/appointment/${id}`);
		const newContactList = appointments.filter((appointment) => {
			return appointment._id !== id;
		});

		setAppointment(newContactList);
	};

	const addAppointmenttHandler = async (appointment) => {
		const request = {
			...appointment,
		};

		const response = await axios.post(
			"http://localhost:8002/appointment",
			request
		);

		console.log(response.data);
		setAppointment([...appointments, response.data]);
	};

	// console.log("doctor ", ProfileTerm.DoctorData);

	return (
		<Router>
			<Header DoctorData={DoctorData} />
			<div className="App">
				<Switch>
					<Route exact path="/login" component={LoginScreen} />
					<Route exact path="/register" component={RegisterScreen} />

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
								DoctorData={DoctorData}
							/>
						</div>
					</Route>
					<Route exact path="/user/:id">
						<DoctorProfile
							DoctorData={() => setDoctorData(ProfileTerm.DoctorData)}
							setDoctorData={setDoctorData}
						/>
					</Route>
					<Route exact path="/FormAppointment">
						<FormAppointment
							addAppointmenttHandler={addAppointmenttHandler}
							DoctorData={() => setDoctorData(ProfileTerm.DoctorData)}
						/>
					</Route>
					<Route exact path="/DoctorAppointmentList">
						<DoctorAppointmentList
							appointments={appointments}
							getContactId={removeContactHandler}
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
