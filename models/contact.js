const { Schema, model } = require("mongoose");

const Joi = require("joi");

const contactShema = Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);
const addSchema = Joi.object({
	name: Joi.string().min(2).max(30).required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
	favorite: Joi.bool(),
});

const updateSchema = Joi.object({
	name: Joi.string().optional(),
	email: Joi.string().email().optional(),
	phone: Joi.string().optional(),
});
const updateFavoriteSchema = Joi.object({
	favorite: Joi.bool().required(),
});
const schemas = {
	add: addSchema,
	update: updateSchema,
	updateFavorite: updateFavoriteSchema,
};
const Contact = model("contact", contactShema);

module.exports = {
	Contact,
	schemas,
};
