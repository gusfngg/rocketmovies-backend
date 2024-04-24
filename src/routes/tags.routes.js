const { Router } = require("express");
const tagsRoutes = Router();

const TagsController = require("../controllers/TagsController");
const tagsController = new TagsController();

const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded")


tagsRoutes.get("/", ensureAuthenticaded, tagsController.index)

module.exports = tagsRoutes;  