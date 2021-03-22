const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const contactRoute = require("./api/routes/contact");
const userRoute = require("./api/routes/user");

const app = express();
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Connection

mongoose
	.connect(process.env.databaseURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log(`Database connected`);
	})
	.catch((err) => {
		console.error(`db error: ${err.message}`);
	});

// Routes

app.use("/contact", contactRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
	res.send("<h3>Server Started</h3>");
	console.log(listDatabases(contacts));
});

// Create server
app.listen(process.env.serverPORT, () => {
	console.log(
		`Server running on "http://localhost:${process.env.serverPORT}"`
	);
});
