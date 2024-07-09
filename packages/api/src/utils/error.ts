import { Response } from "express";

// TODO come up with a better error solution

export type ApiError =
  | {
      message: string;
      status: number;
    }
  | {
      message: string;
      status?: number;
    }
  | {
      message?: string;
      status: number;
    };

const isApiError = (error: unknown): error is ApiError => {
  if (typeof error !== "object") {
    return false;
  }

  const { message, status } = error as ApiError;

  return typeof message === "string" || typeof status === "number";
};

export const handleError = (error: unknown, res: Response) => {
  if (isApiError(error)) {
    const { status = 500, message = "Unknown error" } = error;
    res.status(status).json(message);
    return;
  }

  res.status(500).json("Unknown error");
};
