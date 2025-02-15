# Notification Service

## Overview

The Notification Service is responsible for handling and sending email notifications based on messages received from other microservices via RabbitMQ. It listens for events from the User Service and processes them accordingly.

## Tech Stack

- **Backend:** Node.js
- **Messaging Queue:** RabbitMQ
- **Logging:** Winston
- **Tracing:** OpenTelemetry, Jaeger
- **Containerization:** Docker

## Message Handling

- **Listens for:** Messages from the User Service
- **Processes:** User-related notifications
- **Sends:** Emails to users

## Installation & Setup

### Prerequisites

- Docker & Docker Compose
- Node.js & npm

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/OsamaElshaer/image-processing-microservices
    ```
2. Navigate to the Notification Service directory:
    ```bash
    cd services/notification-service
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables in `.env`.
5. Start the service:
    ```bash
    docker-compose up -d notification-service
    ```

## Environment Variables

The following environment variables need to be set:

- `PORT` - The port on which the service runs.
- `NODE_ENV` - The application environment (e.g., development, production).
- `RABBITMQ_URL` - The connection URL for RabbitMQ.
- `MAILTRAP_USER` - The username for Mailtrap (or other SMTP service).
- `MAILTRAP_PASS` - The password for Mailtrap (or other SMTP service).
- `EMAIL_HOST` - The SMTP host for sending emails.
- `EMAIL_PORT` - The SMTP port for sending emails.
- `EMAIL_USER` - The username for the email service.
- `EMAIL_PASSWORD` - The password for the email service.
- `SERVICE_NAME` - The name of the service.

## Logging & Monitoring

- **Winston** for logging 
- **OpenTelemetry** for distributed tracing
- **Jaeger** serves as the backend storage and UI for visualizing traces.

## License

This service is licensed under MIT.

