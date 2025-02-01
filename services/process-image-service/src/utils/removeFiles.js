const fs = require("fs");
const { logger } = require("./logger");
const path = require("path");
exports.removeImages = (downloadDir, fileName) => {
    const fullPath = path.join(downloadDir, fileName);
    fs.unlink(fullPath, (err) => {
        if (err) {
            logger.error("Error deleting file:", err);
        } else {
            logger.info("File deleted successfully");
        }
    });
};
