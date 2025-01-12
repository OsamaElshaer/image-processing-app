const express = require("express");
const app = express();
const { port } = require("./config/env");
const { getClient } = require("./loaders/postgres");

async function startServer() {
    try {
        await getClient();

        app.listen(port, () => {
            console.log("hello from user service");
        });
    } catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1);
    }
}

startServer();
