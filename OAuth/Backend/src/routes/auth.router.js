const authRouter = require("express").Router();

const { google, callback, register, login, getMe,logout } = require("../controllers/auth.controller");

authRouter.get("/google", google);

authRouter.get("/google/callback", callback);

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/getMe", getMe);

authRouter.post("/logout", logout);

module.exports = authRouter;
