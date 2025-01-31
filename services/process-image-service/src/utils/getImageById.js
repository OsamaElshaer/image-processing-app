const pool = require("../loaders/postgres");

exports.updateImageById = async (id) => {
    try {
        const query = `
        UPDATE images
        SET status='completed'
        WHERE image_id=$1;
        `;
        const values = [id];
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        throw new Error("Error updating image by ID: " + error.message);
    }
};

