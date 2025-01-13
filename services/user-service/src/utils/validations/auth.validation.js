const { body, validationResult } = require("express-validator");

const validateSignUp = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/\d/)
        .withMessage("Password must contain a number")
        .matches(/[A-Z]/)
        .withMessage("Password must contain an uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain a lowercase letter"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
            });
        }
        next();
    },
];

const validateLogin = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
            });
        }
        next();
    },
];

module.exports = {
    validateSignUp,
    validateLogin,
};
