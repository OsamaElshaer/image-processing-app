const crypto = require("crypto");
const { fixedHash } = require("../config/env");

function generateImageHash(userId, imageName) {
    const combinedString = `${userId}-${imageName}`;
    const fHash = fixedHash;
    const hash = crypto
        .createHmac("sha256", fHash) 
        .update(combinedString)
        .digest("hex");
    return hash;
}
module.exports = generateImageHash;
