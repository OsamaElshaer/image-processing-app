const { Pool } = require("pg");
const {
    dbHost,
    postgresUser,
    postgresPassword,
    databaseName,
    dbPort,
} = require("../config/env");

const pool = new Pool({
    user: postgresUser,
    host: dbHost,
    database: databaseName,
    password: postgresPassword,
    port: dbPort,
});

pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

pool.connect()
    .then((client) => {
        console.log("Connected to the database!");
        client.release();
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err.stack);
    });

module.exports = {
    query: (text, params) => pool.query(text, params),

    getClient: async () => {
        const client = await pool.connect();
        try {
            return client;
        } catch (err) {
            console.error("Error getting client:", err);
            throw err;
        } finally {
        }
    },
};
