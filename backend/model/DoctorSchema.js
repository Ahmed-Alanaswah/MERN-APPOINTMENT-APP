"use strict";

const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
	name: String,
	email: String,
});

const DoctorModel = mongoose.model("Doctor", doctorSchema);

module.exports = { DoctorModel };
