### **1. User Authentication Service**

- **POST /api/auth/register** – Register a new user.
- **POST /api/auth/login** – Authenticate a user and return a JWT token.
- **POST /api/auth/logout** – Log the user out by invalidating the JWT token.

------

### **2. Image Upload Service**

- **POST /api/images/upload** – Upload an image for processing.
- **GET /api/images/{imageId}/status** – Get the processing status of an image.
- **GET /api/images/{imageId}/download** – Download the processed image.

------

### **3. Image Processing Service**

- **POST /api/images/{imageId}/process** – Start image processing (resize, filter, watermark, etc.).

------

### **4. Notification Service**

- **POST /api/notifications/send** – Send a notification (email, webhook, etc.) to the user upon task completion.
- **GET /api/notifications/{userId}/status** – Retrieve the status of notifications for a user.

------

### **5. Logging Service**

- **POST /api/logs** – Create a new log entry for monitoring and debugging.
- **GET /api/logs/{logId}** – Retrieve a specific log entry by ID.



## **API Specifications Document**

### 1. **Introduction**

The API Specifications Document outlines the detailed API endpoints for the **Image Processing Application**, including request formats, response formats, authentication mechanisms, and error handling. This document is designed to guide developers in integrating with the API and ensuring seamless communication between the various microservices of the application.

### 2. **API Authentication and Authorization**

#### 2.1 **Authentication Mechanism**

- The application uses **JWT (JSON Web Tokens)** for secure user authentication.
- **Login**: Users authenticate by providing their email and password. If the credentials are valid, a JWT is issued.
- **Authorization**: The JWT token must be included in the **Authorization** header as `Bearer <token>` for accessing protected endpoints. The token is used to verify the identity of the user and enforce role-based access control (RBAC).

#### 2.2 **Role-Based Access Control (RBAC)**

- **Admin Users**: Full access to all endpoints, including managing users and viewing logs.
- **Regular Users**: Limited access to upload, view, and manage their own images.

#### 2.3 **Session Management**

- JWT tokens are valid for a predefined period (e.g., 1 hour) and must be refreshed using the **Refresh Token** mechanism.
- If the token is expired, the user will need to authenticate again.

------

### 3. **API Endpoints**

#### 3.1 **User Authentication Service**

1. **POST /api/auth/register**

   - **Description**: Registers a new user with an email and password.

   - Request Body:

     ```
     jsonCopy code{
       "username": "user1",
       "email": "user1@example.com",
       "password": "password123"
     }
     ```

   - Response:

     - 200 OK

       : Successfully registered the user.

       ```
       jsonCopy code{
         "message": "User registered successfully."
       }
       ```

     - 400 Bad Request: Invalid input.

       ```
       jsonCopy code{
         "error": "Invalid email or password format."
       }
       ```

2. **POST /api/auth/login**

   - **Description**: Authenticates a user and returns a JWT token.

   - Request Body:

     ```
     jsonCopy code{
       "email": "user1@example.com",
       "password": "password123"
     }
     ```

   - Response:

     - 200 OK

       : Authentication successful, JWT token returned.

       ```
       jsonCopy code{
         "token": "jwt_token_string"
       }
       ```

     - 401 Unauthorized

       : Incorrect credentials.

       ```
       jsonCopy code{
         "error": "Invalid email or password."
       }
       ```

3. **POST /api/auth/logout**

   - **Description**: Logs the user out by invalidating the JWT token.

   - Request Body

     :

     ```
     jsonCopy code{
       "token": "jwt_token_string"
     }
     ```

   - Response

     :

     - 200 OK

       : Successfully logged out.

       ```
       jsonCopy code{
         "message": "Logout successful."
       }
       ```

------

#### 3.2 **Image Upload Service**

1. **POST /api/images/upload**

   - **Description**: Allows users to upload an image for processing.

   - Request Headers

     :

     - **Authorization**: `Bearer <jwt_token>`

   - Request Body

     :

     - Multipart form-data with the image file and processing options.

     ```
     jsonCopy code{
       "image": "<image_file>",
       "processingOptions": {
         "resize": "800x600",
         "watermark": "logo.png"
       }
     }
     ```

   - Response

     :

     - 201 Created

       : Image successfully uploaded and queued for processing.

       ```
       jsonCopy code{
         "message": "Image uploaded successfully.",
         "imageId": "abc123"
       }
       ```

     - 400 Bad Request

       : Invalid image format or size.

       ```
       jsonCopy code{
         "error": "Unsupported image format or file size too large."
       }
       ```

     - 401 Unauthorized

       : Missing or invalid token.

       ```
       jsonCopy code{
         "error": "Unauthorized. Please log in."
       }
       ```

2. **GET /api/images/{imageId}/status**

   - **Description**: Retrieves the processing status of an image.

   - Request Headers

     :

     - **Authorization**: `Bearer <jwt_token>`

   - Response

     :

     - 200 OK

       : Status information.

       ```
       jsonCopy code{
         "status": "in progress",
         "imageId": "abc123"
       }
       ```

     - 404 Not Found

       : Image ID does not exist.

       ```
       jsonCopy code{
         "error": "Image not found."
       }
       ```

3. **GET /api/images/{imageId}/download**

   - **Description**: Allows the user to download the processed image.

   - Request Headers

     :

     - **Authorization**: `Bearer <jwt_token>`

   - Response

     :

     - 200 OK

       : Direct URL for downloading the image.

       ```
       jsonCopy code{
         "downloadUrl": "https://s3.amazonaws.com/bucket/processed_image.jpg"
       }
       ```

     - 404 Not Found

       : Image not found or not processed yet.

       ```
       jsonCopy code{
         "error": "Processed image not available."
       }
       ```

------

#### 3.3 **Image Processing Service**

1. POST /api/images/{imageId}/process

   - **Description**: Starts processing for a given image with the selected operations (resize, filter, etc.).

   - Request Headers:

     - **Authorization**: `Bearer <jwt_token>`

   - Request Body:

     ```
     jsonCopy code{
       "resize": "1024x768",
       "filter": "grayscale",
       "watermark": "watermark.png"
     }
     ```

   - Response:

     - 200 OK

       : Processing started successfully.

       ```
       jsonCopy code{
         "message": "Processing started for image abc123."
       }
       ```

     - 400 Bad Request

       : Invalid request data.

       ```
       jsonCopy code{
         "error": "Invalid processing options."
       }
       ```

#### 3.4 **Notification Service**

1. **POST /api/notifications/send**

   - **Description**: Sends a notification to the user when image processing is complete.

   - Request Body

     :

     ```
     jsonCopy code{
       "userId": "user1",
       "message": "Your image has been processed successfully.",
       "imageId": "abc123",
       "notificationType": "email"
     }
     ```

   - Response

     :

     - 200 OK

       : Notification successfully sent.

       ```
       jsonCopy code{
         "message": "Notification sent successfully."
       }
       ```

     - 400 Bad Request

       : Invalid notification data.

       ```
       jsonCopy code{
         "error": "Invalid notification type or missing data."
       }
       ```

2. **GET /api/notifications/{userId}/status**

   - **Description**: Retrieves the status of notifications for a user.

   - Request Headers

     :

     - **Authorization**: `Bearer <jwt_token>`

   - Response

     :

     - 200 OK

       : Notification status for the user.

       ```
       jsonCopy code{
         "status": "sent",
         "notificationType": "email",
         "message": "Your image has been processed successfully."
       }
       ```

     - 404 Not Found

       : No notifications found for the user.

       ```
       jsonCopy code{
         "error": "No notifications found."
       }
       ```

------

#### 3.5 **Logging Service**

1. **POST /api/logs**

   - **Description**: Creates a new log entry for system monitoring and debugging.

   - Request Body

     :

     ```
     jsonCopy code{
       "logLevel": "error",
       "message": "Image processing failed for image abc123",
       "timestamp": "2024-12-14T14:00:00Z"
     }
     ```

   - Response

     :

     - 200 OK

       : Log entry successfully created.

       ```
       jsonCopy code{
         "message": "Log entry created successfully."
       }
       ```

     - 400 Bad Request

       : Invalid log entry format.

       ```
       jsonCopy code{
         "error": "Invalid log format."
       }
       ```

2. **GET /api/logs/{logId}**

   - **Description**: Retrieves a specific log entry by ID.

   - Request Headers

     :

     - **Authorization**: `Bearer <jwt_token>`

   - Response

     :

     - 200 OK

       : Log entry found.

       ```
       jsonCopy code{
         "logId": "log123",
         "logLevel": "error",
         "message": "Image processing failed for image abc123",
         "timestamp": "2024-12-14T14:00:00Z"
       }
       ```

     - 404 Not Found

       : Log entry not found.

       ```
       jsonCopy code{
         "error": "Log entry not found."
       }
       ```

------

### 4. **Error Handling**

The API follows a standardized approach for error handling. Each error response will include the following attributes:

- **error**: A short, human-readable description of the error.
- **details** (optional): A more detailed message that explains the error condition, where applicable.
- **statusCode**: The HTTP status code corresponding to the error.

#### 4.1 **Common Error Responses**

- **400 Bad Request**: Invalid input data or malformed request.
- **401 Unauthorized**: Authentication failed or missing token.
- **403 Forbidden**: User does not have permission to perform the action.
- **404 Not Found**: Resource does not exist (e.g., image not found).
- **500 Internal Server Error**: General server error or unexpected issue.

Example error response:

```
jsonCopy code{
  "error": "Invalid input",
  "details": "The image file exceeds the maximum allowed size of 10MB.",
  "statusCode": 400
}
```

------

### 5. **Versioning**

The API follows a versioning strategy to ensure backward compatibility. Each version of the API will be available under a versioned endpoint, such as `/api/v1/` or `/api/v2/`.

- **Versioning Strategy**: The major version of the API will be incremented for breaking changes.
- **Current Version**: v1

Example of versioned endpoint:

- `/api/v1/images/upload`
- `/api/v2/images/upload` (newer version with potential breaking changes)

------

### 6. **Rate Limiting and Throttling**

The API will implement rate limiting to prevent abuse and ensure fairness. Each user or service will be allowed a fixed number of requests per minute.

#### 6.1 **Rate Limiting**

- **Requests per minute**: 100 requests.

- Rate Limiting Response

  :

  - If the limit is exceeded, the server will respond with:

    ```
    jsonCopy code{
      "error": "Rate limit exceeded. Please try again later.",
      "statusCode": 429
    }
    ```

------

### 7. **Example Requests and Responses**

Here are a few example requests and their corresponding responses:

#### Example 1: Image Upload

- **Request**:

```
bashCopy codePOST /api/images/upload
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

--boundary
Content-Disposition: form-data; name="image"; filename="image.jpg"
Content-Type: image/jpeg

<image_data>
--boundary--
```

- **Response**:

```
jsonCopy code{
  "message": "Image uploaded successfully.",
  "imageId": "abc123"
}
```

#### Example 2: Image Processing Status

- **Request**:

```
bashCopy codeGET /api/images/abc123/status
Authorization: Bearer <jwt_token>
```

- **Response**:

```
jsonCopy code{
  "status": "in progress",
  "imageId": "abc123"
}
```