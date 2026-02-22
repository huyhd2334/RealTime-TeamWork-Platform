# 🚀 TeamWork Platform -- Real-time Collaboration System

> A real-time teamwork platform supporting chat, meeting rooms, user
> status tracking and JWT authentication using Socket.IO architecture.

------------------------------------------------------------------------

## 📁 Project Structure

``` bash
src/
│
├── server.js                # Entry point
├── app.js                   # Express app setup
│
├── config/
│   ├── socket.config.js     # Socket server configuration
│   └── db.config.js         # Database configuration
│
├── controllers/
│   ├── auth.controller.js   # Authentication logic
│   └── message.controller.js# HTTP message handling
│
├── services/
│   ├── message.service.js   # Business logic for messages
│   └── meeting.service.js   # Business logic for meetings
│
├── models/
│   ├── user.model.js        # User schema
│   └── message.model.js     # Message schema
│
├── socket/
│   ├── index.js             # Socket entry
│   ├── chat.socket.js       # Chat events
│   ├── meeting.socket.js    # Meeting events
│   └── status.socket.js     # Online/offline tracking
│
└── utils/
    └── jwt.js               # JWT helper functions
```

------------------------------------------------------------------------

## 🧠 Architecture Overview

This project follows a layered clean architecture:

-   Controller Layer → Handles HTTP requests\
-   Service Layer → Contains business logic\
-   Model Layer → Database schema\
-   Socket Layer → Real-time communication\
-   Config Layer → DB & Socket configuration\
-   Utils Layer → Helper utilities (JWT, etc.)

------------------------------------------------------------------------

## ⚙️ Tech Stack

-   Node.js\
-   Express.js\
-   Socket.IO\
-   MongoDB / Mongoose\
-   JWT Authentication

------------------------------------------------------------------------

## 🔌 Real-time Features

### 💬 Chat System

-   Private messaging\
-   Room-based messaging\
-   Message persistence

### 📞 Meeting Room

-   Join / leave room\
-   Real-time participant updates\
-   Scalable room logic

### 🟢 User Status

-   Online / Offline tracking\
-   Broadcast user presence

------------------------------------------------------------------------

## 🔐 Authentication Flow

1.  User login\
2.  Server generates JWT\
3.  Client connects to Socket with token\
4.  Middleware verifies token\
5.  User is authorized for real-time events

------------------------------------------------------------------------

## 🚀 How To Run

``` bash
git clone <your-repo>
cd project
npm install
npm run dev
```

------------------------------------------------------------------------

## 🎯 Why This Project?

This project demonstrates:

-   Clean backend architecture\
-   Real-time scalable system design\
-   Separation of concerns\
-   Production-level folder structure\
-   JWT-secured socket communication
