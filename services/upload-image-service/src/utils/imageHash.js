const bcrypt = require("bcrypt");

function generateImageHash(userId, imageName) {
    const combinedString = `${userId}-${imageName}`;
    const hash = bcrypt.hash(combinedString,12);
    return hash;
}
module.exports = generateImageHash;
