const { v4: uuidv4 } = require("uuid");
const { getClient } = require("../loaders/postgres");

class UserModel {
    // Create a new user
    create = async (userData) => {
        try {
            const { email, name, passwordHash } = userData;
            const query = `
                INSERT INTO users (id, email, name, password_hash)
                VALUES ($1, $2, $3, $4)
                RETURNING id, email, name;
            `;
            const values = [uuidv4(), email, name, passwordHash];
            const res = await getClient.query(query, values);
            return res.rows[0]; // Returning the newly created user
        } catch (error) {
            throw new Error("Error creating user: " + error.message);
        }
    };

    // Find a user by email
    findByEmail = async (email) => {
        try {
            const query = `SELECT * FROM users WHERE email = $1`;
            const res = await getClient.query(query, [email]);
            return res.rows[0]; // Returns the user if found
        } catch (error) {
            throw new Error("Error finding user by email: " + error.message);
        }
    };

    // Update user data by their ID
    update = async (userId, updatedUserData) => {
        try {
            const { passwordHash, name, resetToken, resetTokenExpiry } =
                updatedUserData;
            const query = `
                UPDATE users
                SET password_hash = COALESCE($1, password_hash), name = COALESCE($2, name),
                    reset_token = COALESCE($3, reset_token), reset_token_expiry = COALESCE($4, reset_token_expiry)
                WHERE id = $5
                RETURNING id, email, name;
            `;
            const values = [
                passwordHash,
                name,
                resetToken,
                resetTokenExpiry,
                userId,
            ];
            const res = await getClient.query(query, values);
            return res.rows[0]; // Returning the updated user data
        } catch (error) {
            throw new Error("Error updating user: " + error.message);
        }
    };

    // Check if the user exists by email (for login or reset password)
    findByEmail = async (email) => {
        try {
            const query = `SELECT * FROM users WHERE email = $1`;
            const res = await getClient.query(query, [email]);
            return res.rows[0]; // Returns the user if found
        } catch (error) {
            throw new Error("Error finding user by email: " + error.message);
        }
    };
}

module.exports = new UserModel();
