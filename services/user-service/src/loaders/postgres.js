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


module.exports = pool;
