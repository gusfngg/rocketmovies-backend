const { Router } = require("express");

const SessiosController = require("../controllers/SessiosController");
const sessiosController = new SessiosController();

const sessiosRoutes = Router();

sessiosRoutes.post("/", sessiosController.create);

module.exports = sessiosRoutes;