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

const app = express()
dotenv.config();
const __dirname = path.resolve();

// middleware
app.use(express.json())

// cookie
app.use(cookieParser())

cors
app.use(cors({
  origin: "*",
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
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", async (code) => {
    console.log("Joining room:", code);
    socket.join(code);

    const clients = Array.from(io.sockets.adapter.rooms.get(code) || []);
    const otherClients = clients.filter(id => id !== socket.id);

    socket.to(code).emit("user-joined", socket.id);

    otherClients.forEach(id => {
      socket.emit("user-joined", id);
    });

    socket.emit("joined-room", code);
  });

  socket.on("offer", ({ sdp, to }) => {
    socket.to(to).emit("offer", { sdp, from: socket.id });
  });

  socket.on("answer", ({ sdp, to }) => {
    socket.to(to).emit("answer", { sdp, from: socket.id });
  });

  socket.on("ice-candidate", ({ candidate, to }) => {
    socket.to(to).emit("ice-candidate", { candidate, from: socket.id });
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
