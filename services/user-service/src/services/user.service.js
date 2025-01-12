// user.service.js
const { validationResult } = require("express-validator");
const CustomError = require("../utils/customError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { audit } = require("../utils/audit");
const crypto = require("crypto");

class AuthService {
    constructor(userModel) {
        this.userModel = userModel; // Dependency Injection for model
    }

    signUp = async (req, res, next) => {
        try {
            const userData = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new CustomError("signup", 422, errors.array()[0].msg);
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(userData.password, 12);
            userData.password = hashedPassword;

            // Save user to the database
            const userId = await this.userModel.create(userData);

            // Log audit
            audit(
                "User",
                "Signup",
                userData.userName,
                req.method,
                res.statusCode
            );

            // Return success response
            return res.status(201).json({
                msg: "User signed up successfully",
                data: { userId, status: true },
            });
        } catch (error) {
            next(error);
        }
    };

    login = async (req, res, next) => {
        try {
            const { user } = req;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new CustomError("login", 422, errors.array()[0].msg);
            }

            const payload = { userId: user.id };
            const token = jwt.sign(payload, env.jwtSecretKey, {
                expiresIn: "1h",
            });

            // Log audit
            audit("User", "Login", user.userName, req.method, res.statusCode);

            // Return JWT token
            return res.status(200).json({
                msg: "User logged in successfully",
                data: { token, status: true },
            });
        } catch (error) {
            next(error);
        }
    };

    forgetPassword = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new CustomError(
                    "forgetPassword",
                    422,
                    errors.array()[0].msg
                );
            }

            // Generate a random reset token
            const buffer = await new Promise((resolve, reject) => {
                crypto.randomBytes(32, (err, buffer) => {
                    if (err) {
                        reject(
                            new CustomError(
                                "crypto randomToken",
                                422,
                                err.message
                            )
                        );
                    }
                    resolve(buffer);
                });
            });

            const resetToken = buffer.toString("hex");
            const resetTokenExpire = Date.now() + 600000; // Token expires in 10 minutes

            const user = req.user; // Assuming `req.user` is set earlier (e.g., JWT validation)
            user.token = { resetToken, resetTokenExpire };

            // Update user in DB with new reset token
            await this.userModel.update(user.id, user);

            // Log audit
            audit(
                "User",
                "Forget Password",
                user.userName,
                req.method,
                res.statusCode
            );

            // Return success response
            return res.status(200).json({
                msg: "Check your email to reset your password",
                data: { status: true },
            });
        } catch (error) {
            next(error);
        }
    };

    resetPassword = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new CustomError(
                    "resetPassword",
                    422,
                    errors.array()[0].msg
                );
            }

            const { password } = req.body;
            const user = req.user;
            const hashedPassword = await bcrypt.hash(password, 12); // Hash the new password

            user.password = hashedPassword;
            await this.userModel.update(user.id, user); // Update user with the new password

            // Log audit
            audit(
                "User",
                "Reset Password",
                user.userName,
                req.method,
                res.statusCode
            );

            // Return success response
            return res.status(200).json({
                msg: "Password reset successfully",
                data: { status: true },
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = AuthService;
