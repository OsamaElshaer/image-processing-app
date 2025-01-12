const express = require("express");
const router = express.Router();
const AuthService = require("../services/user.service");
const userModelObj = require("../models/user.model");
const authService = new AuthService(userModelObj);
const {
    validateSignup,
    validateLogin,
    validateForgetPassword,
    validateResetPassword,
} = require("../utils/validations/auth.validation");

const { signUp, login, forgetPassword, resetPassword } = authService;

router.post("/signup", validateSignup, signUp);
router.post("/login", validateLogin, login);
router.post("/forgetPassword", validateForgetPassword, forgetPassword);
router.post("/resetPassword/:resetToken", validateResetPassword, resetPassword);

// Export router directly
module.exports.authRouter = router;
