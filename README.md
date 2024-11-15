# Authentication REST API

This project is a **Node.js** and **Express** backend REST API built with **TypeScript**, following a **clean architecture** design. It includes authentication and user management endpoints with features like **JWT-based security**, **input validation**, and **Swagger documentation**.

## Features

- **Authentication**: Secure login, registration, re-authentication, and logout.
- **User Management**: Endpoints for updating user info, changing passwords, and removing accounts.
- **Validation**: Input validation for all endpoints to ensure data integrity.
- **JWT Security**: Token-based authentication for secure access.
- **Swagger Documentation**: Auto-generated API documentation for easy reference.
- **Clean Architecture**: Organized and scalable code structure.

## Endpoints

- `POST /login`: User login.
- `POST /register`: User registration.
- `POST /reauth`: Re-authenticate the user.
- `POST /logout`: User logout.
- `DELETE /remove-account`: Remove user account.
- `GET /user`: Get user information.
- `PATCH /change-password`: Change user password.
- `PATCH /edit-user-info`: Edit user information.

## What I Learned

- Designing REST APIs using Express and TypeScript.
- Implementing clean architecture for better maintainability.
- Securing APIs with JSON Web Tokens (JWT).
- Writing comprehensive API documentation with Swagger.
