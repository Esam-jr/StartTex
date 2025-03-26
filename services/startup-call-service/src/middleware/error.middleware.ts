import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
    return;
  }

  console.error("Error:", err);
  res.status(500).json({
    message: "Internal server error",
  });
};
