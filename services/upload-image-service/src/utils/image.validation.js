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
        .isArray({ min: 1 })
        .withMessage(
            "process_option must be an array with at least one object."
        ),
    body("process_option.*.type")
        .exists()
        .withMessage("Each object in process_option must have a 'type' field.")
        .isIn(["resize", "crop", "convert", "grayscale", "compress"])
        .withMessage(
            "Invalid type. Allowed types: 'resize', 'crop', 'convert', 'grayscale', 'compress'."
        ),
    body("process_option.*").custom((option) => {
        switch (option.type) {
            case "resize":
                if (
                    !Number.isInteger(option.width) ||
                    option.width <= 0 ||
                    !Number.isInteger(option.height) ||
                    option.height <= 0
                ) {
                    throw new Error(
                        "'resize' type requires positive integer 'width' and 'height'."
                    );
                }
                break;
            case "crop":
                if (
                    !Number.isInteger(option.left) ||
                    !Number.isInteger(option.top) ||
                    !Number.isInteger(option.cropWidth) ||
                    !Number.isInteger(option.cropHeight) ||
                    option.left < 0 ||
                    option.top < 0 ||
                    option.cropWidth <= 0 ||
                    option.cropHeight <= 0
                ) {
                    throw new Error(
                        "'crop' type requires non-negative integers: 'left', 'top', and positive integers: 'cropWidth', 'cropHeight'."
                    );
                }
                break;
            case "convert":
                if (!["jpeg", "png", "webp", "tiff"].includes(option.format)) {
                    throw new Error(
                        "'convert' type requires a valid 'format' field: 'jpeg', 'png', 'webp', 'tiff'."
                    );
                }
                break;
            case "compress":
                if (
                    typeof option.quality !== "number" ||
                    option.quality < 1 ||
                    option.quality > 100
                ) {
                    throw new Error(
                        "'compress' type requires 'quality' field between 1 and 100."
                    );
                }
                break;
            case "grayscale":
                // No extra validation needed for grayscale
                break;
            default:
                throw new Error("Unknown process_option type.");
        }
        return true;
    }),
];

module.exports = { validateOptions, parseProcessOption };
