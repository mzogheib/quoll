import { Response } from "express";

export type ApiError = {
  message: string;
  status?: number;
};

const isApiError = (error: unknown): error is ApiError =>
  typeof error === "object" &&
  error !== null &&
  "message" in error &&
  typeof error.message === "string";

export const handleError = (error: unknown, res: Response) => {
  if (isApiError(error)) {
    const { status = 500, message } = error;
    res.status(status).json(message);
    return;
  }

  res.status(500).json("Unknown error");
};
