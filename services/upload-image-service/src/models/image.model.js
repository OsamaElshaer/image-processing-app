const pool = require("../loaders/postgres");
const generateImageHash = require("../utils/imageHash");

exports.create = async (imageObj) => {
    try {
        let { userId, fileName, imageUrl, status } = imageObj;

        // Generate the image hash
        const imageHash = generateImageHash(userId, fileName);

        let query = `
            INSERT INTO images (user_id, file_name, file_path, status, image_hash)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING image_id
        `;
        let values = [userId, fileName, imageUrl, status, imageHash];
        let res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        throw new Error("Error creating image: " + error.message);
    }
};
//async function always wraps its return value in a promise, whether you use await or not
//so using await it will make this promise have the resolved value
