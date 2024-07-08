import { Request } from "express";

export type AuthenticatedRequest = Request & { userId: string };
