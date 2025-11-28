import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "../config/db.js" 
import cookieParser from "cookie-parser"
import path from 'path';
import routerAuth from "./routers/routeAuth.js"
import { protectedRouter } from "./middlewares/authMiddleware.js"

import http from "http"; // socket
import { Server } from "socket.io"; // socket
import roomRouter from "./routers/routeCrRoom.js"

import Meetings from "./models/Meetings.js"

const app = express()
dotenv.config();
const __dirname = path.resolve();

// middleware
app.use(express.json())

// cookie
app.use(cookieParser())

cors
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// public router 
app.use("/api/auth", routerAuth)
// private routers
app.use("/api", protectedRouter, roomRouter)

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", async (code) => {
    console.log("Joining room:", code);
    socket.join(code);
    socket.to(code).emit("user-joined", socket.id);
    socket.emit("joined-room", code);
  });

  socket.on("offer", (data) => {
    socket.to(data.roomCode).emit("offer", { sdp: data.sdp, from: socket.id });
  });

  socket.on("answer", (data) => {
    socket.to(data.roomCode).emit("answer", { sdp: data.sdp, from: socket.id });
  });

  socket.on("ice-candidate", (data) => {
    socket.to(data.roomCode).emit("ice-candidate", { candidate: data.candidate, from: socket.id });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Connect DB and start server
connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
  });
});
