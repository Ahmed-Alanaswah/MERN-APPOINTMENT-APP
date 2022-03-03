"use strict";

const { AppintmentModel } = require("../model/AppointmentSchema");
const protect = require("../middleware/auth");
const createAppointment = async (req, res) => {
	let { name, email, date, doctorId } = req.body;

	let newAppintment = AppintmentModel({
		doctorId: doctorId,
		name: name,
		email: email,
		date: date,
	});

	newAppintment.save();
	let appointmentList = await AppintmentModel.find({});
	res.status(201).json(appointmentList);
};

const getAppointment = async (req, res) => {
	let { doctor_Id } = req.query;
	AppintmentModel.find({ doctorId: doctor_Id }, async (err, data) => {
		if (err) {
			res.status(500).send("an error occured");
		} else {
			// let appointmentList = await AppintmentModel.find({});
			await res.json(data);
		}
	});
};

const getAllAppointment = async (req, res) => {
	let appointmentList = await AppintmentModel.find({});
	res.status(201).json(appointmentList);
};

const deleteAppointment = (req, res) => {
	let id = req.params.id;

	AppintmentModel.findByIdAndDelete(id, async (err, data) => {
		if (err) {
			res.status(500).send("an error occured");
		} else {
			let appointmentList = await AppintmentModel.find({});
			res.json(appointmentList);
		}
	});
};

module.exports = {
	createAppointment,
	getAppointment,
	deleteAppointment,
	getAllAppointment,
};
