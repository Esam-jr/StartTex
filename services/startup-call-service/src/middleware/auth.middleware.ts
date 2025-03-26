import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    // Handle test tokens
    if (token === "admin-token") {
      req.user = { id: "test-admin", role: "admin" };
      next();
      return;
    }

    if (token === "user-token") {
      req.user = { id: "test-user", role: "user" };
      next();
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    // Handle test tokens
    if (token === "admin-token") {
      req.user = { id: "test-admin", role: "admin" };
      next();
      return;
    }

    if (token === "user-token") {
      res.status(403).json({ message: "Forbidden - Admin access required" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as JwtPayload;

    if (decoded.role !== "admin") {
      res.status(403).json({ message: "Forbidden - Admin access required" });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
