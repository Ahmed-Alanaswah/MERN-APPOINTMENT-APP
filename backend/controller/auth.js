const { UserModel } = require("../model/UserSchema");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");

function validate(req) {
	const schema = {
		email: Joi.string().min(8).max(255).required().email(),
		password: Joi.string().min(8).max(1024).required(),
	};

	return Joi.validate(req, schema);
}

const auth = async (req, res) => {
	const { error } = validate(req.body);

	if (error) {
		return res.status(404).send(error.details[0].message);
	}

	let user = await UserModel.findOne({ email: req.body.email });
	if (!user) {
		return res.status(404).send("invalid email or password");
	}

	const checkPassword = await bcrypt.compare(req.body.password, user.password);

	if (!checkPassword) {
		return res.status(404).send("invalid email or password");
	}

	let token = user.generateTokens();
	res.send(token);
};

module.exports = { auth };
