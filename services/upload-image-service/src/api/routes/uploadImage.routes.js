const express = require("express");
const router = express.Router();
const upload = require("../../config/multer.js");
const {
    uploadImage,
    getImage,
    deleteImage,
} = require("../../controllers/image.controller.js");

router.post("/upload", upload.single("image"), uploadImage);

router.get("/:filename", getImage);
router.delete("/:filename", deleteImage);

module.exports.imageRouter = router;
