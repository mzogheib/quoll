export type ApiError = {
  message: string;
  status?: number;
};

export const isApiError = (error: unknown): error is ApiError =>
  typeof error === "object" &&
  error !== null &&
  "message" in error &&
  typeof error.message === "string";
