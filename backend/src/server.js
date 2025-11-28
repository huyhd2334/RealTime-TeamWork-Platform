import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "../config/db.js" 
import cookieParser from "cookie-parser"
import path from 'path';
import routerAuth from "./routers/routeAuth.js"
import { protectedRouter } from "./middlewares/authMiddleware.js"
import roomRouter from "./routers/routeCrRoom.js"
import twilio from "twilio"; 

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

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

app.get("/api/tokentwilio", (req, res) => {
  const identity = req.query.identity || "user" + Math.floor(Math.random() * 1000);
  const room = req.query.room || "defaultRoom";

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    { identity }
  );

  token.addGrant(new VideoGrant({ room }));
  res.json({ token: token.toJwt(), identity });
});
if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Connect DB and start server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
  });
});
