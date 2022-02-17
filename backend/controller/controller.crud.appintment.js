"use strict";

const { AppintmentModel } = require("../model/AppointmentSchema");

const createAppointment = async (req, res) => {
	let { name, email, date } = req.body;

	let newAppintment = AppintmentModel({
		name: name,
		email: email,
		date: date,
	});

	newAppintment.save();
	let appointmentList = await AppintmentModel.find({});
	res.status(201).json(appointmentList);
};

const getAppointment = async (req, res) => {
	const data = await AppintmentModel.find({});
	res.send(data);
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
};
