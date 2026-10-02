import jwt from "jsonwebtoken";
import env from "../../config/env.js";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const err = new Error("Unauthorized: No token provided");
    err.status = 401;
    return next(err);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.auth.jwtSecret);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    const error = new Error("Unauthorized: Invalid or expired token");
    error.status = 401;
    next(error);
  }
};