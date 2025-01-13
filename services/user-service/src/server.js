const { port } = require("./config/env");
const app = require("./loaders/app");
const { logger } = require("./utils/logger");
const cluster = require("cluster");
const os = require("os");
const client  = require("./loaders/postgres");

const numCPUs = os.cpus().length;

async function startServer() {
    try {
        // Initialize PostgreSQL client
        await client.connect();
        logger.log("info", "Database connection established successfully.");

        // Start the server
        app.listen(port, () => {
            logger.log("info", `Server is running on port ${port}`);
            console.log("Hello from user service");
        });
    } catch (error) {
        // Log and handle database connection errors
        logger.error("Error connecting to the database:", error.message);
        console.error("Error connecting to the database", error);
        process.exit(1); // Exit process on critical error
    }
}

// if (cluster.isMaster) {
//     logger.log("info", `Master process ${process.pid} is running`);

//     // Fork workers for each CPU core
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     // Restart workers on failure
//     cluster.on("exit", (worker, code, signal) => {
//         logger.warn(`Worker process ${worker.process.pid} exited.`);
//         logger.log("info", "Forking a new worker...");
//         cluster.fork();
//     });
// } else {
//     // Start the server in worker process
//     startServer();
//     logger.log("info", `Worker process ${process.pid} started`);

//     // Gracefully handle unhandled promise rejections
//     process.on("unhandledRejection", (err) => {
//         logger.error("Unhandled Promise Rejection:", err.message);
//         logger.debug(err);
//         shutdownServer();
//     });

//     // Gracefully handle uncaught exceptions
//     process.on("uncaughtException", (err) => {
//         logger.error("Uncaught Exception:", err.message);
//         logger.debug(err);
//         shutdownServer();
//     });
// }

// /**
//  * Gracefully shuts down the server and exits the process.
//  */
// function shutdownServer() {
//     if (app && app.close) {
//         app.close((error) => {
//             if (error) {
//                 logger.error(
//                     "Error occurred while closing the server:",
//                     error.message
//                 );
//                 process.exit(1);
//             }
//             logger.info("Server gracefully shut down.");
//             process.exit(1);
//         });
//     } else {
//         process.exit(1);
//     }
// }
startServer();
