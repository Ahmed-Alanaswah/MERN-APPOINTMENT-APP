"use strict";

const mongoose = require("mongoose");

const appintmentSchema = mongoose.Schema({
	doctorId: String,
	name: String,
	email: String,
	date: { type: String, unique: true },
});

const AppintmentModel = mongoose.model("Appointment", appintmentSchema);

module.exports = { AppintmentModel };
