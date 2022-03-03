const { UserModel, userValidate } = require("../model/UserSchema");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

getUser = async (req, res) => {
	const data = await UserModel.find({});

	res.status(200).send(data);
};

getUserProfile = async (req, res) => {
	const data = await UserModel.findById(req.params.id).select("-password");

	res.status(200).send(data);
};

const createUSer = async (req, res) => {
	const { error } = userValidate(req.body);

	if (error) {
		return res.status(404).send(error.details[0].message);
	}

	let user = await UserModel.findOne({ email: req.body.email });
	if (user) {
		return res.status(404).send("this email exists");
	}

	const newUSer = new UserModel(
		_.pick(req.body, ["name", "email", "password", "isAdmin"])
	);
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	newUSer.password = await bcrypt.hash(newUSer.password, salt);
	await newUSer.save();
	let token = newUSer.generateTokens();
	res
		.header("x-auth-token", token)
		.send(_.pick(newUSer, ["_id", "name", "email", "isAdmin"]));
	// let userList = await UserModel.find({});
	// res.status(201).json(userList);
};

module.exports = { createUSer, getUser, getUserProfile };
