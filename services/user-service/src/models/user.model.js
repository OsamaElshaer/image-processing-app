const { v4: uuidv4 } = require("uuid");
const client = require("../loaders/postgres");
class UserModel {
    create = async (userData) => {
        try {
            const { email, name, passwordHash } = userData;
            const query = `
                INSERT INTO users (id, email, name, password_hash)
                VALUES ($1, $2, $3, $4)
                RETURNING id, email, name;
            `;
            const values = [uuidv4(), email, name, passwordHash];
            const res = await client.query(query, values);
            return res.rows[0]; // Returning the newly created user
        } catch (error) {
            throw new Error("Error creating user: " + error.message);
        }
    };

    findByEmail = async (email) => {
        try {
            const query = `SELECT * FROM users WHERE email = $1`;
            const res = await client.query(query, [email]);
            return res.rows[0]; // Returns the user if found
        } catch (error) {
            throw new Error("Error finding user by email: " + error.message);
        }
    };
}

module.exports = new UserModel();
