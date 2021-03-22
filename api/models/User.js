const mongoose = require("mongoose");
const valid = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		trim: true,
		unique: true,
		validate: {
			validator: (v) => {
				return valid.isEmail(v);
			},
			message: `{VALUE} is not an email`,
		},
	},
	password: String,
});

module.exports = User = mongoose.model("User", userSchema);
