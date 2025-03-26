import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { AppError } from "./error.middleware";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    throw new AppError(errorMessages.join(", "), 400);
  }
  next();
};
