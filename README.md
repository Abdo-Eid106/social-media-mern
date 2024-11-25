# Social Media Platform

A feature-rich social media platform with real-time capabilities, built with modern web technologies.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Environment Variables](#environment-variables)
4. [Installation](#installation)
   - [Backend](#backend)
   - [Frontend](#frontend)

## Features

- **Authentication and Authorization:** Secure user authentication with JWT, including role-based access control for protected resources.
- **Forgot and Reset Password:** Users can request a password reset and securely update their credentials.
- **Chats and Messages:** Real-time communication between users via WebSockets.
- **Notifications:** Get notified about interactions such as likes, comments, and retweets in real-time.
- **Posts:** Create, delete, like/unlike, retweet, and comment on posts.
- **File Uploads:** Upload and manage profile and cover pictures using Cloudinary.

## Technologies Used

### Backend

- **Node.js** with **NestJS Framework**.
- **GraphQL** for API.
- **MySQL** as the database.
- **Prisma ORM**.
- **Socket.IO** for real-time communication.
- **Cloudinary** for file storage.
- **Dataloader** for solving the N+1 problem.

### Frontend

- **React** with **TypeScript**.
- **Vite** for building a Single Page Application.
- **Apollo Client** for consuming the GraphQL API.
- **React Router** for routing.

## Environment Variables

The following environment variables need to be set in your `.env` file:

```plaintext
DATABASE_URL=mysql://<username>:<password>@<host>:<port>/<database_name>

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL=your_email_username
EMAIL_PASS=your_email_password

FRONTEND_URL=http://localhost:5173
```

## Installation

1. Clone the repository:
   ```bash
     git clone https://github.com/Abdo-Eid106/social-media-platform
   ```
2. navigate to project
   ```bash
     cd social-media-platform
   ```

### Backend

1. Ensure **Node.js**, **MySQL**, and **NestJS CLI** are installed on your system.

2. Navigate to the api folder
   ```bash
     cd api
   ```
3. Install dependencies
   ```bash
       npm install
   ```
4. start the backend app
   ```bash
       npm run start
   ```

### Front end

1. Navigate to the client folder

2. Install dependencies
   ```bash
       npm install
   ```
3. start the frontend app
   ```bash
       npm run start
   ```
