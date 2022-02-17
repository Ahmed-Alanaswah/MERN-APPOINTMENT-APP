"use strict";

const { UsertModel } = require("../model/UserSchema");

const createUser = async (req, res) => {
	let { name, email } = req.body;

	let newUser = UsertModel({
		name: name,
		email: email,
	});

	newUser.save();
	let UserList = await UsertModel.find({});
	res.status(201).json(UserList);
};

const getUser = async (req, res) => {
	const data = await UsertModel.find({});
	res.send(data);
};

const deleteUser = (req, res) => {
	let id = req.params.id;

	DoctorModel.findByIdAndDelete(id, async (err, data) => {
		if (err) {
			res.status(500).send("an error occured");
		} else {
			let UserList = await UsertModel.find({});
			res.json(UserList);
		}
	});
};

module.exports = {
	createUser,
	getUser,
	deleteUser,
};
