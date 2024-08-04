import { Request } from "express";

export type RequestWithUserId = Request & { userId: string };
