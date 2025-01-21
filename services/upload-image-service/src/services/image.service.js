const pool = require("../loaders/postgres");

exports.getImageByHash = async (imageHash) => {
    try {
        const query = `
            SELECT * FROM images
            WHERE image_hash = $1
        `;
        const values = [imageHash];
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        throw new Error("Error fetching image by hash: " + error.message);
    }
};
