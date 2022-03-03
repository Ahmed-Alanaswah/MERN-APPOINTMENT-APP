import React, { useState, useEffect } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
export const ProfileContext = React.createContext();

export function ProfileProvider(props) {
	const history = useHistory();
	const [DoctorData, setDoctorData] = useState("");
	const [DoctorList, setDoctorList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [appointments, setAppointment] = useState([]);
	const [doctorId, setDoctorId] = useState("");
	const showProfilehundler = async (id) => {
		const response = await axios.get(`http://localhost:8002/user/${id}`);

		setDoctorData(response.data);
		setDoctorId(response.data.id);
		localStorage.setItem("doctor", JSON.stringify(response.data));

		window.location.replace(`/user/${id}`);
	};

	return (
		<ProfileContext.Provider
			value={{
				DoctorData,
				setDoctorData,
				DoctorList,
				setDoctorList,
				searchTerm,
				setSearchTerm,
				appointments,
				setAppointment,
				showProfilehundler,
				setDoctorId,
				doctorId,
			}}
		>
			{props.children}
		</ProfileContext.Provider>
	);
}
