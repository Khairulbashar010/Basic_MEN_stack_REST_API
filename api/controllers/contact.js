const Contact = require("../models/Contact");

// Get all contact controller
const getAllContactsController = (req, res, next) => {
	Contact.find()
		.then((contact) => {
			res.status(200).json({
				message: "All Contacts",
				contact,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: "Error occured",
				err,
			});
		});
};

// Get one Contact controller
const getOneContactController = (req, res, next) => {
	const { id } = req.params;
	Contact.findById(id)
		.then((data) => {
			if (data) {
				res.status(200).json({
					message: "Contact Found",
					data,
				});
			} else {
				res.status(404).json({
					message: "Contact Not Found",
					id,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: "Error occured. Not an id",
				err,
			});
		});
};

// Create new contact controller
const createContactController = (req, res, next) => {
	const { name, phone, email } = req.body;

	const contact = new Contact({
		name: name,
		phone: phone,
		email: email,
	});
	contact
		.save()
		.then((data) => {
			res.status(201).json({
				message: "Contact Created",
				data,
			});
		})
		.catch((err) => {
			res.json({
				message: err.message,
			});
		});
};

// Update Contact controller
const updateContactController = (req, res, next) => {
	const { id } = req.params;
	const UpdatedContact = {
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
	};

	Contact.findByIdAndUpdate(id, { $set: UpdatedContact })
		.then((data) => {
			Contact.findById(id).then((newData) => {
				res.status(200).json({
					message: "Contact Updated",
					newData,
				});
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: "Error occured",
				err,
			});
		});
};

// Delete Contact controller
const deleteContactController = (req, res, next) => {
	const { id } = req.params;
	Contact.findByIdAndDelete(id)
		.then((data) => {
			res.status(204).json({
				message: "Contact Deleted",
				data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: "Error occured",
				err,
			});
		});
};

module.exports = {
	getAllContactsController,
	createContactController,
	getOneContactController,
	updateContactController,
	deleteContactController,
};
