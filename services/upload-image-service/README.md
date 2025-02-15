# Upload Image Service

## Overview

The Upload Image Service handles image uploads and status tracking. It provides API endpoints for users to upload images and check the processing status. It communicates with the Process Image Service via RabbitMQ to process images asynchronously.

## Tech Stack

-   **Backend:** Node.js
-   **Database:** Postgres
-   **Storage:** Local file system
-   **Messaging Queue:** RabbitMQ
-   **Caching:** Redis
-   **Logging:** Winston
-   **Tracing:** OpenTelemetry, Jaeger
-   **Containerization:** Docker

## API Endpoints

-   `POST /api/images/upload` - Upload an image with processing options.

-   `GET /api/images/status/:id` - Check the processing status of an uploaded image (Uses long polling)

## Installation & Setup

### Prerequisites

-   Docker & Docker Compose
-   Node.js & npm

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/OsamaElshaer/image-processing-microservices
    ```
2. Navigate to the Upload Image Service directory:
    ```bash
    cd services/upload-image-service
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables in `.env`.
5. Start the service:
    ```bash
    docker-compose up -d upload-image-service
    ```

## Environment Variables

The following environment variables need to be set:

-   `PORT` - The port on which the Upload Image Service runs (default: 4000).
-   `HOST` - The hostname where the service runs (default: `localhost`).
-   `STORAGE_TYPE` - The type of storage used for uploaded images (e.g., `local`).
-   `UPLOAD_DIR` - The directory where uploaded images are stored.
-   `NODE_ENV` - The application environment (e.g., `development`, `production`).
-   `MAX_FILE_SIZE` - The maximum allowed file size for uploads.
-   `JWT_SECRET_KEY` - The secret key for JWT authentication.
-   `FIXED_HASH` - A fixed hash value for image verification.
-   `DB_HOST` - The hostname of the PostgreSQL database.
-   `DB_PORT` - The port on which PostgreSQL is running.
-   `POSTGRES_USER` - The database user.
-   `POSTGRES_PASSWORD` - The database user's password.
-   `DATABASE_NAME` - The name of the PostgreSQL database.
-   `REDIS_HOST` - The hostname of the Redis server.
-   `REDIS_PORT` - The port on which Redis is running.
-   `RABBITMQ_URL` - The connection URL for RabbitMQ message broker.
-   `SERVICE_NAME` - The identifier for the Upload Image Service instance (default: `upload-image-service`).

## Logging & Monitoring

-   **Winston** for logging
-   **OpenTelemetry** for distributed tracing
-   **Jaeger** serves as the backend storage and UI for visualizing traces.

## License

This service is licensed under MIT.
