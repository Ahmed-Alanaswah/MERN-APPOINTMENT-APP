"use strict";

const express = require("express");
const cors = require("cors");

require("dotenv").config();
const { auth } = require("./controller/auth");
const { protect } = require("./middleware/auth");
const { admin } = require("./middleware/admin");
const {
	createAppointment,
	getAppointment,
	deleteAppointment,
	getAllAppointment,
} = require("./controller/controller.crud.appintment");

const {
	createUSer,
	getUser,
	getUserProfile,
} = require("./controller/controllers.crud.users");

const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`server worked PORT ${PORT}`);
});

mongoose.connect(
	"mongodb+srv://Aa1791994:Aa1791994@cluster0.eqhsz.mongodb.net/Node_auth?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,

		useUnifiedTopology: true,
	}
);

app.get("/appointment", getAppointment);
app.get("/getAllAppointment", getAllAppointment);
app.post("/appointment", createAppointment);
app.delete("/appointment/:id", deleteAppointment);

app.post("/user", createUSer);
app.get("/user", getUser);
app.get("/user/:id", getUserProfile);
app.post("/auth", auth);

app.all("*", (req, res, next) => {
	res.status(404).json({
		status: "false",
		message: "page not found",
	});
});
