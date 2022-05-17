const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const updateFavorite = async (req, res) => {
	const { id } = req.params;
	const { favorite } = req.body;
	const result = await Contact.findByIdAndUpdate(
		id,
		{ favorite },
		{
			new: true,
		}
	);
	if (result) {
		return res.status(200).json(result);
	}
	createError(404);
};
module.exports = updateFavorite;
