const pool = require("../loaders/postgres");
exports.create = async (imageObj) => {
    try {
        let { userId, fileName, imageUrl, status, imageHash } = imageObj;

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

exports.getImageById = async (id) => {
    try {
        const query = `
            SELECT * FROM images
            WHERE image_id = $1
        `;
        const values = [id];
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        throw new Error("Error fetching image by ID: " + error.message);
    }
};
exports.updateImageById = async (id, imageStatus, processedPath) => {
    try {
        const query = `
        UPDATE images
        SET status=$2, processed_path=$3
        WHERE image_id=$1;
        `;
        const values = [id, imageStatus, processedPath];
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        throw new Error("Error updating image by ID: " + error.message);
    }
};
