const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validation, validateId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", validateId, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.add), ctrlWrapper(ctrl.add));

router.put(
	"/:id",
	validateId,
	validation(schemas.update),
	ctrlWrapper(ctrl.updateById)
);

router.patch(
	"/:id/favorite",
	validateId,
	validation(schemas.updateFavorite),
	ctrlWrapper(ctrl.updateFavorite)
);
router.delete("/:id", validateId, ctrlWrapper(ctrl.removeById));

module.exports = router;
