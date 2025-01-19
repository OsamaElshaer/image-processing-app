const { uploadDir } = require("../config/env");

const fs = require("fs");
const path = require("path");



exports.deleteImage = (filename) => {
    const imagePath = path.join(uploadDir, filename);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }
};

exports.getImageUrl = (filename) => {
    const imagePath = path.join(uploadDir, filename);
    if (fs.existsSync(imagePath)) {
        return `/uploads/${filename}`;
    } else {
        throw new Error("Image not found");
    }
};
