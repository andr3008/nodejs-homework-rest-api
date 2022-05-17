const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const updateById = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	if (result) {
		res.json(result);
	}
	createError(404);
};
module.exports = updateById;
