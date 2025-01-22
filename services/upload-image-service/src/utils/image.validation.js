const { body } = require("express-validator");

const parseProcessOption = (req, res, next) => {
    if (req.body.process_option) {
        try {
            req.body.process_option = JSON.parse(req.body.process_option);
        } catch (error) {
            return res
            .status(400)
            .json({ error: "Invalid JSON format for process_option" });
        }
    }
    next();
};

const validateOptions = [
    body("process_option")
        .optional()
        .isObject()
        .withMessage("process_option must be an object"),

    body("process_option.resize")
        .optional()
        .isObject()
        .withMessage("Resize must be an object"),

    body("process_option.resize.width")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Width must be a positive integer"),

    body("process_option.resize.height")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Height must be a positive integer"),


];

module.exports = { validateOptions, parseProcessOption };
