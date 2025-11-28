import jwt from "jsonwebtoken";
import Account from "../models/Account.js";

export const protectedRouter = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Token is required" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify token
    let decodedUser;
    try {
      decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SCRETE);
    } catch (err) {
      console.error("JWT Error:", err);
      return res.status(403).json({ message: "Invalid or expired token!" });
    }

    // Find user
    const user = await Account.findById(decodedUser.user_id).select("-hashPassW");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectedRouter:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
