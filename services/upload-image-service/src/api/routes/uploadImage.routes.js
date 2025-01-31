const express = require("express");
const router = express.Router();
const {
    validateOptions,
    parseProcessOption,
} = require("../../utils/image.validation");
const {
    uploadImage,
    statusImage,
    downloadImage,
} = require("../../controllers/image.controller");
const upload = require("../../config/multer");

router.post(
    "/upload",
    upload.single("image"),
    parseProcessOption,
    validateOptions,
    uploadImage
);
router.get("/status", statusImage);

module.exports.imageRouter = router;
