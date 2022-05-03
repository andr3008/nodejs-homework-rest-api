const Joi = require("joi");

const createSchema = Joi.object({
	name: Joi.string().min(2).max(30).required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
});

const updateSchema = Joi.object({
	name: Joi.string().optional(),
	email: Joi.string().email().optional(),
	phone: Joi.string().optional(),
});

const validateCreate = async (req, res, next) => {
	try {
		await createSchema.validateAsync(req.body);
	} catch (err) {
		return res.status(400).json({ message: "missing required name field" });
	}
	next();
};
const validateUpdate = async (req, res, next) => {
	try {
		await updateSchema.validateAsync(req.body);
	} catch (err) {
		const [{ type }] = err.details;
		if (type === "object.unknown") {
			return res.status(400).json({ message: err.message });
		}
		return res.status(400).json({ message: `missing fields` });
	}
	next();
};

module.exports = {
	validateCreate,
	validateUpdate,
};
