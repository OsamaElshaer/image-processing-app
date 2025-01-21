const express = require("express");
const router = express.Router();
const upload = require("../../config/multer.js");
const { uploadImage } = require("../../controllers/image.controller.js");

router.post("/upload", upload.single("image"), uploadImage);

module.exports.imageRouter = router;
