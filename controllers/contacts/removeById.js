const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const removeById = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndRemove(id);
	if (result) {
		return res.status(200).json({ message: "contact deleted" });
	}
	createError(404);
};
module.exports = removeById;
