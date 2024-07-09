import { Response } from "express";

import { get as getUser } from "../controllers/users.controller";
import { get as getTimeline } from "../controllers/timeline.controller";
import { handleError } from "../utils/error";
import { AuthenticatedRequest } from "./types";

export const get = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { from, to } = req.query;
    const { userId } = req;

    if (typeof from !== "string" || typeof to !== "string") {
      throw { status: 400, message: "Invalid query parameters" };
    }

    const user = await getUser(userId);
    const timeline = await getTimeline(from, to, user);

    res.status(200).json(timeline);
  } catch (error) {
    handleError(error, res);
  }
};
