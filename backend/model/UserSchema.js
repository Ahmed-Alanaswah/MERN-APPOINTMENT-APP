"use strict";

const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
	name: { type: String, required: true, minlength: 3, maxlength: 44 },
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
		maxlength: 255,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 1024,
	},

	isAdmin: Boolean,
});

userSchema.methods.generateTokens = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
			isAdmin: this.isAdmin,
		},
		"privateKey"
	);
	return token;
};

function userValidate(userSchema) {
	const schema = {
		name: Joi.string().min(3).max(44).required(),
		email: Joi.string().min(8).max(255).required().email(),
		password: Joi.string().min(8).max(1024).required(),
		isAdmin: Joi.boolean(),
	};

	return Joi.validate(userSchema, schema);
}

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel, userValidate };
