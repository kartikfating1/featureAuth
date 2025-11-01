  # Authz Microservice

## Overview
PA-AuthZ is designed to handle authentication, authorization, role management, and user synchronization. This service is built using Node.js and TypeScript, leveraging Express.js for routing and middleware functionalities. Key features include Azure Active Directory integration for authentication, JWT-based authorization, and robust role-based access control.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
    - [Development Environment](#development-environment)
    - [Staging Environment](#staging-environment)
    - [Production Environment](#production-environment)
    - [Building the Project](#building-the-project)
- [API Documentation](#api-documentation)
- [Testing](#testing)

## Technologies Used

- **Node.js**: v18.x
- **TypeScript**: v5.x
- **Express.js**: v4.x
- **Mongoose**: v8.x
- **MongoDB**: v6.x
- **Joi**: v17.x
- **Winston**: v3.x
- **Swagger**: v1.8.0
- **Jest**: v29.x
- **ESLint**: v8.x
- **Prettier**: v3.x
- **Supertest**: v7.0.0
- **dotenv**: v16.x

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/caxsolindia/pa-authz.git
   cd pa-authz

2. **Install dependencies:**
   ```bash
   npm install

## Configuration
If a `.env` file is not present in the root directory, create one and include the following environment variables:

```bash
PORT=3015
DB_HOST_DEV=localhost
DB_USER_DEV=user
DB_PASSWORD_DEV=pass
```

## Running the Application
Access the application at `http://localhost:3015`


### Development Environment
To run the microservice in development environment use:

```bash
npm run start:dev
```

### Staging Environment
To run the microservice in staging environment use:

```bash
npm run start:staging
```

### Production Environment
To run the microservice in production environment use:

```bash
npm run start:production
```

### Building the Project

```bash
npm run build 
```

## API Documentation
API documentation is available at /api-docs when the server is running. The documentation is auto-generated using Swagger and Swagger UI.

Access the API documentation at `http://localhost:3015/api-docs`.

## Testing

```bash
npm run test
```
