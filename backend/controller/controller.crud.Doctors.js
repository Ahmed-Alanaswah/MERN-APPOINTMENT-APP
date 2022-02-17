"use strict";

const { DoctorModel } = require("../model/DoctorSchema");

const createDoctor = async (req, res) => {
	let { name, email } = req.body;

	let newDoctor = DoctorModel({
		name: name,
		email: email,
	});

	newDoctor.save();
	let doctorList = await DoctorModel.find({});
	res.status(201).json(doctorList);
};

const getDoctor = async (req, res) => {
	const data = await DoctorModel.find({});
	res.send(data);
};

const deleteDoctor = (req, res) => {
	let id = req.params.id;

	DoctorModel.findByIdAndDelete(id, async (err, data) => {
		if (err) {
			res.status(500).send("an error occured");
		} else {
			let doctorList = await DoctorModel.find({});
			res.json(doctorList);
		}
	});
};

module.exports = {
	createDoctor,
	getDoctor,
	deleteDoctor,
};
