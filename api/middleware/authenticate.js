const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]; // Splits headers and gets token
		const decode = jwt.verify(token, process.env.SECRETKEY); // Verifies the token

		req.user = decode; // To find the user from token
		next();
	} catch (err) {
		res.status(401).json({
			message: "Authentication failed!",
		});
	}
};

module.exports = authenticate
