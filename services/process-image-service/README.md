# Process Image Service

## Overview

The Process Image Service is responsible for processing uploaded images asynchronously. It consumes messages from RabbitMQ, applies the requested transformations, and updates the image status in the system.

## Tech Stack

-   **Backend:** Node.js
-   **Image Processing:** Sharp
-   **Messaging Queue:** RabbitMQ
-   **Logging:** Winston
-   **Tracing:** OpenTelemetry, Jaeger
-   **Containerization:** Docker

## Environment Variables

The following environment variables need to be set:

-   `PORT` - The port on which the Process Image Service runs.
-   `HOST` - The hostname where the service runs.
-   `PROTOCOL` - The communication protocol used (e.g., `http`).
-   `JWT_SECRET_KEY` - The secret key for JWT authentication.
-   `SERVICE_NAME` - The identifier for the Process Image Service instance.
-   `NODE_ENV` - The application environment (e.g., `development`, `production`).
-   `RABBITMQ_URL` - The connection URL for RabbitMQ message broker.

## Installation & Setup

### Prerequisites

-   Docker & Docker Compose
-   Node.js & npm

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/OsamaElshaer/image-processing-microservices
    ```
2. Navigate to the Process Image Service directory:
    ```bash
    cd services/process-image-service
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables in `.env`.
5. Start the service:
    ```bash
    docker-compose up -d process-image-service
    ```

## Logging & Monitoring

-   **Winston** for logging
-   **OpenTelemetry** for distributed tracing
-   **Jaeger** serves as the backend storage and UI for visualizing traces.

## License

This service is licensed under MIT.
