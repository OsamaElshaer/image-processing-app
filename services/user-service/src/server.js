const { port } = require("./config/env");
const app = require("./loaders/app");
const { logger } = require("./utils/logger");
const { connectRabbitMQ } = require("../src/loaders/rabbitmq");
const client = require("./loaders/postgres");

const cluster = require("cluster");
const os = require("os");

const numCPUs = os.cpus().length;
async function startServer() {
    try {
        await client.connect();
        await connectRabbitMQ();

        logger.log("info", "Database connection established successfully.");
        app.listen(port, () => {
            logger.log("info", `user-service is running on port ${port}`);
        });
    } catch (error) {
        logger.error("Error connecting to the database:", error.message);
        logger.error("Error connecting to the database", error);
        process.exit(1);
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
