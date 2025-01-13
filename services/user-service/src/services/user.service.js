// user.service.js
const { validationResult } = require("express-validator");
const CustomError = require("../utils/customError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { audit } = require("../utils/audit");
const { jwtSecretKey } = require("../config/env");

class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
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
            const { email, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new CustomError("login", 422, errors.array()[0].msg);
            }

            // Find user by email
            const user = await this.userModel.findByEmail(email);
            if (!user) {
                throw new CustomError(
                    "login",
                    401,
                    "Invalid email or password"
                );
            }

            // Compare passwords
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password_hash
            );
            if (!isPasswordValid) {
                throw new CustomError(
                    "login",
                    401,
                    "Invalid email or password"
                );
            }

            // Create JWT payload
            const payload = { userId: user.id };
            const token = jwt.sign(payload, env.jwtSecretKey, {
                expiresIn: "1h",
            });

            // Log audit
            audit("User", "Login", user.email, req.method, res.statusCode);

            // Return JWT token
            return res.status(200).json({
                msg: "User logged in successfully",
                data: { token, status: true },
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = AuthService;
