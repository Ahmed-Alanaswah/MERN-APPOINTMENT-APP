"use strict";
const jwt = require("jsonwebtoken");

const admin = function (req, res, next) {
	if (!req.user.isAdmin) {
		return res.status(403).send("you are not admin");
	}
	next();
};

module.exports = { admin };
