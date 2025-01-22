const bcrypt = require("bcrypt");

let fixedSalt = bcrypt.genSaltSync(10);
console.log(fixedSalt);
function generateImageHash(userId, imageName) {
    const combinedString = `${userId}-${imageName}`;
    const hash = bcrypt.hashSync(combinedString, fixedSalt);
    return hash;
}
module.exports = generateImageHash;
