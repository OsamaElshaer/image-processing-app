# Software Requirements Specification (SRS)

**Project Title:** Image Processing Application
**Prepared By:** Osama Elshaer
**Date:** 12/14/2024

------

## 1. Introduction

### 1.1 Purpose

This document defines the software requirements for the Image Processing Application, designed using a microservices architecture. The application provides a scalable, modular solution for users to upload, process, and retrieve images, supporting various operations such as resizing, filtering, watermarking, and format conversion. This SRS outlines the functional, non-functional, and system architecture requirements, providing the necessary guidance for development, testing, and deployment.

### 1.2 Scope

The Image Processing Application is a cloud-based service that facilitates asynchronous image processing. Users can interact with the system through an API or web interface to upload images and specify processing tasks. The backend leverages microservices for scalability and fault tolerance, ensuring high availability and efficient processing. Key features include:

- Image upload and storage
- Image processing (resize, filters, watermarking, format conversion)
- Task notification
- User management

This application will be deployed in a distributed environment, utilizing AWS for storage, MongoDB for metadata storage, RabbitMQ or Kafka for messaging, and the ELK stack for centralized logging.

------

## 2. Overall Description

### 2.1 Product Perspective

The Image Processing Application is a cloud-native solution built on a microservices architecture, ensuring modularity and scalability. Each service will perform a specific function, such as handling image uploads, processing tasks, sending notifications, or managing user data. The system is designed to operate independently, allowing for easy scaling of individual services based on demand.

### 2.2 Product Features

The application will offer the following key features:

1. **Image Upload**: Users can upload images via an API or web interface.
2. **Asynchronous Image Processing**: Tasks such as resizing, filtering, watermarking, and format conversion will be queued and executed asynchronously.
3. **Image Processing Tasks**:
   - Resize
   - Apply filters (e.g., grayscale, blur, sharpen)
   - Watermark images
   - Convert image formats (e.g., PNG to JPEG)
4. **User Notifications**: Notifications will be sent to users upon task completion through email, or push notifications.
5. **Logging**: Logs will be maintained for monitoring, debugging, and auditing purposes.
6. **User Authentication and Management**: Users will be able to register, authenticate, and manage their profiles.

### 2.3 User Classes and Characteristics

The system will serve two primary user classes:

- **End Users**: Users who interact with the application to upload images, process them, and receive notifications upon task completion.
- **Admin Users**: Users who manage system performance, review logs, monitor system health, and handle user account management.

### 2.4 Operating Environment

- **Backend**: Node.js microservices containerized with Docker.
- **Storage**: Amazon S3 for image storage or the same server of upload image.
- **Database**: Postgres DB for metadata storage (e.g., user profiles, image processing logs).
- **Message Queue**: RabbitMQ or Kafka to handle high-concurrency tasks and ensure message delivery.
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana) for centralized logging and monitoring.

### 2.5 Assumptions and Dependencies

- The system assumes that users have reliable internet connectivity for uploading and downloading images.
- External storage services (e.g., AWS S3) will be available for image storage.
- The message queue (RabbitMQ or Kafka) must handle high concurrency without performance degradation.
- The application will require secure HTTPS connections for all communications.

------

## 3. Functional Requirements

### 3.1 Image Upload Service

- **FR1**: The service shall accept image files via the API.
- **FR2**: The service shall validate image formats (JPEG, PNG, GIF) and file sizes to ensure compliance.
- **FR3**: The service shall store images in AWS S3 and maintain references to them in the MongoDB database.
- **FR4**: Upon successful upload, the service shall generate metadata and enqueue processing tasks for further processing.

### 3.2 Image Processing Service

- **FR5**: The service shall retrieve image metadata and the image itself from storage for processing.
- **FR6**: The service shall perform the requested processing tasks, including resizing, applying filters, adding watermarks, and converting formats.
- **FR7**: The service shall store the processed image in AWS S3.
- **FR8**: Upon successful processing, the service shall notify the Notification Service to inform the user.

### 3.3 Notification Service

- **FR9**: The service shall notify users via email, webhooks, or push notifications when a task is completed.
- **FR10**: The service shall provide a download URL for the processed image, enabling the user to retrieve it.

### 3.4 Logging Service

- **FR11**: The service shall aggregate logs from all microservices and forward them to a centralized ELK stack.
- **FR12**: The service shall allow real-time querying of logs for monitoring and debugging purposes.

### 3.5 API Gateway

- **FR13**: The API Gateway shall route requests to the appropriate microservices based on the request type.
- **FR14**: The API Gateway shall enforce authentication and authorization using JWT tokens.

### 3.6 User Service

- **FR15**: The service shall allow users to register with email and password.
- **FR16**: The service shall authenticate users and generate JWT tokens for session management.
- **FR17**: The service shall implement RBAC, ensuring users and admins have appropriate permissions.
- **FR18**: The service shall allow users to update their profile information.
- **FR19**: The service shall provide password reset functionality.
- **FR20**: The service shall track user activity for auditing purposes.
- **FR21**: The service shall allow admins to delete user accounts and associated data.

------

## 4. Non-Functional Requirements

### 4.1 Performance Requirements

- The system shall support up to 1,000 concurrent image uploads.
- Image processing tasks shall be completed within 5 seconds for standard operations (e.g., resizing, applying filters).

### 4.2 Scalability Requirements

- The architecture shall be horizontally scalable, allowing additional instances of microservices to be deployed to handle increased load.

### 4.3 Security Requirements

- All communication between services shall be encrypted using HTTPS.
- User authentication shall rely on secure JWT tokens, ensuring session integrity and confidentiality.

### 4.4 Availability Requirements

- The system shall achieve an uptime of 99.9%, ensuring high availability.
- In the event of task failure, the system shall automatically retry the failed tasks with an exponential backoff strategy.

### 4.5 Logging and Monitoring

- All system logs shall be centralized and made queryable in real time.
- The system shall trigger alerts for critical failures, enabling proactive resolution.

------

## 5. System Models

### 5.1 Architecture Diagram

The system will follow a microservices-based architecture, comprising the following components:

- API Gateway
- Image Upload Service
- Image Processing Service
- Notification Service
- Logging Service
- User Service
- Message Queue (RabbitMQ/Kafka)

### 5.2 Sequence Diagram

The sequence diagram for the image upload process is as follows:

1. The user uploads an image via the API Gateway.
2. The API Gateway routes the request to the Image Upload Service.
3. The Image Upload Service stores the image in AWS S3 and enqueues the processing task.
4. The Image Processing Service retrieves the task and processes the image.
5. The processed image is stored back in S3.
6. The Notification Service informs the user of the task completion and provides a download URL.
