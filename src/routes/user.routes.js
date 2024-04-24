const { Router } = require("express");
const multer = require("multer")

const uploadConfig = require("../config/upload")

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const UserController = require("../controllers/UserController")
const UserAvatarController = require("../controllers/UserAvatarController")
const userController = new UserController();
const userAvatarController = new UserAvatarController();

const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded")

userRoutes.post("/", userController.create)
userRoutes.put("/", ensureAuthenticaded, userController.update)
userRoutes.patch("/avatar", ensureAuthenticaded, upload.single("avatar"), userAvatarController.update)

module.exports = userRoutes;  