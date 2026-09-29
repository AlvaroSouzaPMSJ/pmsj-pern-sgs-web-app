import jwt from "jsonwebtoken";
import env from "../../config/env.js";

export const requireAuth = () => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Unauthorized: No token provided");
    error.status = 401;
    return notExists(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.auth.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    const error = new Error("Unauthorized: Invalid or expired token");
    error.status = 401;
    next(error);
  }
};