const multer = require("multer");
const { uploadDir } = require("../config/env");
const generateImageHash = require("../utils/imageHash");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const imageHash = generateImageHash(req.user.userId, file.originalname);
        console.log(imageHash);
        const fileExt = path.extname(file.originalname);
        cb(null, `${imageHash}${fileExt}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});

module.exports = upload;
