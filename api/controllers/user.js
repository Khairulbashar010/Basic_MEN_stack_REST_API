const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// User Register Controller

const registerController = (req, res, next) => {
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if (err) {
			res.status(500).json({
				message: "Error ocured",
				err,
			});
		}

		let user = new User({
			email: req.body.email,
			password: hash,
		});

		user.save()
			.then((data) => {
				res.status(201).json({
					message: "User registered successfully!",
					cradentials: data,
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: "Error ocured",
					err,
				});
			});
	});
};

// User Login Controller

const loginController = (req, res, next) => {
	let { email, password } = req.body;
	User.findOne({ email })
		.then((user) => {
			if (user) {
				bcrypt.compare(password, user.password, (err, result) => {
					if (err) {
						res.status(500).json({
							message: "Error ocured",
							err,
						});
					}
					if (result) {
						let token = jwt.sign(
							{ email: user.email, _id: user._id },
							process.env.SECRETKEY,
							{ expiresIn: "2h" }
						);
						res.status(200).json({
							message: "Login Successful!",
							token,
						});
					} else {
						res.status(401).json({
							message: "Password doesn't match",
						});
					}
				});
			} else {
				res.status(404).json({
					message: "User not found",
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: "Error occured",
				err,
			});
		});
};

// Get all User Controller

const getUsers = (req, res, next) => {
	User.find()
		.then((data) => {
			res.status(200).json({
				message: "All users",
				data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: "Error ocured",
				err,
			});
		});
};

// Exports

module.exports = {
	registerController,
	getUsers,
	loginController,
};
