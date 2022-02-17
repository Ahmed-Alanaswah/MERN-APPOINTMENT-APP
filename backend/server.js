"use strict";

const express = require("express");
const cors = require("cors");

require("dotenv").config();

const {
	createAppointment,
	getAppointment,
	deleteAppointment,
} = require("./controller/controller.crud.appintment");

const {
	createDoctor,
	getDoctor,
	deleteDoctor,
} = require("./controller/controller.crud.Doctors");

const {
	createUser,
	getUser,
	deleteUser,
} = require("./controller/controller.crud.User");
const app = express();
const mongoose = require("mongoose");
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`server worked PORT ${PORT}`);
});

mongoose.connect(
	"mongodb+srv://Aa1791994:Aa1791994@cluster0.eqhsz.mongodb.net/Fruits?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,

		useUnifiedTopology: true,
	}
);

app.get("/appointment", getAppointment);
app.post("/appointment", createAppointment);
app.delete("/appointment/:id", deleteAppointment);

app.get("/doctor", getDoctor);
app.post("/doctor", createDoctor);
app.delete("/doctor/:id", deleteDoctor);

app.get("/user", getUser);
app.post("/user", createUser);
app.delete("/user/:id", deleteUser);
