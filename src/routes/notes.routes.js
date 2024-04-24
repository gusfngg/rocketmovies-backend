const { Router } = require("express");
const notesRoutes = Router();

const NotesController = require("../controllers/NotesController");
const notesController = new NotesController();

const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded")

notesRoutes.use(ensureAuthenticaded)

notesRoutes.get("/", notesController.index)
notesRoutes.post("/", notesController.create)   
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)

module.exports = notesRoutes;  