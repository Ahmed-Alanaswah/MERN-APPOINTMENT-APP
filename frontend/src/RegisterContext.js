import React, { useState, useEffect } from "react";

export const RegisterContext = React.createContext();

export function RegisterProvider(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");

	const [error, setError] = useState("");
	const [isAdmin, setAdmin] = useState(Boolean);

	return (
		<RegisterContext.Provider
			value={{
				name,
				setName,
				email,
				setEmail,
				password,
				setPassword,
				confirmpassword,
				setConfirmPassword,
				error,
				setError,
				isAdmin,
				setAdmin,
			}}
		>
			{props.children}
		</RegisterContext.Provider>
	);
}
