# User Service

## Overview

The User Service is responsible for user authentication and management. It provides API endpoints for user signup and login and communicates with the Notification Service via RabbitMQ to send user-related notifications.

## Tech Stack

-   **Backend:** Node.js
-   **Database:** PostgreSQL
-   **Messaging Queue:** RabbitMQ
-   **Logging:** Winston
-   **Tracing:** OpenTelemetry, Jaeger
-   **Containerization:** Docker

## API Endpoints

-   `POST /api/users/signup` - Register a new user
-   `POST /api/users/login` - Authenticate a user

## Installation & Setup

### Prerequisites

-   Docker & Docker Compose
-   Node.js & npm

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/OsamaElshaer/image-processing-microservices
    ```
2. Navigate to the User Service directory:
    ```bash
    cd services/user-service
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables in `.env`.
5. Start the service:
    ```bash
    docker-compose up -d user-service
    ```

## Environment Variables

The following environment variables need to be set:

-   `PORT` - The port on which the User Service runs (default: 6000).
-   `DB_HOST` - The hostname of the PostgreSQL database (e.g., `localhost`).
-   `DB_PORT` - The PostgreSQL database port (default: 5432).
-   `POSTGRES_USER` - The username for the PostgreSQL database.
-   `POSTGRES_PASSWORD` - The password for the PostgreSQL database.
-   `DATABASE_NAME` - The name of the database used by the User Service.
-   `WHITE_LIST` - Specifies allowed origins for CORS (default: `*`).
-   `NODE_ENV` - The application environment (e.g., `development`, `production`).
-   `JWT_SECRET` - The secret key used for signing JWT authentication tokens.
-   `RABBITMQ_URL` - The connection URL for RabbitMQ message broker.
-   `SERVICE_NAME` - The identifier for the User Service instance (default: `user-service`).

## Logging & Monitoring

-   **Winston** for logging
-   **OpenTelemetry** for distributed tracing
-   **Jaeger** serves as the backend storage and UI for visualizing traces.

## License

This service is licensed under MIT.
