const pool = require("../loaders/postgres");

exports.updateImageById = async (id, processedPath) => {
    try {
        const query = `
        UPDATE images
        SET status='completed', processed_path=$2
        WHERE image_id=$1;
        `;
        const values = [id, processedPath];
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        throw new Error("Error updating image by ID: " + error.message);
    }
};
