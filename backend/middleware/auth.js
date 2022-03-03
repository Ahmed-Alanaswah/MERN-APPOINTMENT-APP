const jwt = require("jsonwebtoken");
const protect = function (req, res, next) {
	const token = req.header("x-auht-token");

	if (!token) {
		return res.status(401).send("acces regected");
	}

	try {
		const decodeToken = jwt.verify(token, "privateKey");

		req.user = decodeToken;
		next();
	} catch (error) {
		res.status(400).send("wrong token");
	}
};

module.exports = { protect };
