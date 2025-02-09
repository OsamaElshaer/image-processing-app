const express = require("express");
const router = express.Router();
const AuthService = require("../../services/user.service");
const userModelObj = require("../../models/user.model");
const authService = new AuthService(userModelObj);
const {
    validateSignUp,
    validateLogin,

} = require("../../utils/validations/auth.validation");

const { signUp, login} = authService;

router.post("/signup", validateSignUp, signUp);
router.post("/login", validateLogin, login);


module.exports.authRouter = router;
