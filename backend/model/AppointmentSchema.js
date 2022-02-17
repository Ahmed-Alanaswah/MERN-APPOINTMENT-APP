"use strict";

const mongoose = require("mongoose");

const appintmentSchema = mongoose.Schema({
	name: String,
	email: String,
	date: String,
});

const AppintmentModel = mongoose.model("Appointment", appintmentSchema);

module.exports = { AppintmentModel };
