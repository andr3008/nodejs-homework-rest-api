const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const getById = async (req, res, next) => {
	const { id } = req.params;
	const result = await Contact.findById(id);
	if (result) {
		res.json(result);
	}
	createError(404);
};
module.exports = getById;
