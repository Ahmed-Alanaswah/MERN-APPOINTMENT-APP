"use strict";

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: String,
	email: String,
});

const UsertModel = mongoose.model("User", userSchema);

module.exports = { UsertModel };
