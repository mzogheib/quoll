import { NextFunction, Request, Response } from "express";
import {
  login as _login,
  createUser,
  get,
} from "../controllers/users.controller";
import { handleError } from "../utils/error";
import { AuthenticatedRequest } from "./types";

export const login = async (req: Request, res: Response) => {
  // TODO: userId should be a bearer token?
  const userId = req.body.userId;

  if (!userId) {
    res.status(400).json("No client key provided.");
    return;
  }

  try {
    const user = await _login(userId);

    if (!user) {
      res.status(404).json(`Could not find user with id: ${userId}`);
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    handleError(error, res);
  }
};

export const signup = async (_: Request, res: Response) => {
  try {
    const user = await createUser();
    res.status(200).json(user);
  } catch (error) {
    handleError(error, res);
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (authHeader === undefined) {
    res.status(403).json("No auth provided");
    return;
  }

  try {
    // "Authorization: Basic userId:". Want the userId from that string
    const userId = authHeader.split(" ")[1].split(":")[0];
    const user = await get(userId);

    if (!user) {
      res.status(401).json("Unauthorized");
      return;
    }

    // TODO come up with a better typing
    (req as AuthenticatedRequest).userId = userId;
    next();
  } catch (error) {
    handleError(error, res);
  }
};
