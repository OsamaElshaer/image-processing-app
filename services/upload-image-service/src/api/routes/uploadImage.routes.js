const express = require("express");
const router = express.Router();
const {
    validateOptions,
    parseProcessOption,
} = require("../../utils/image.validation");
const { uploadImage } = require("../../controllers/image.controller");
const upload = require("../../config/multer");
router.post(
    "/upload",
    upload.single("image"),
    parseProcessOption,
    validateOptions,
    uploadImage
);
module.exports.imageRouter = router;
