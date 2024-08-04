import { NextFunction, Request, Response } from "express";
import { createUser, getUser } from "../controllers/user.controller";
import { handleError } from "../utils/error";
import { AuthenticatedRequest } from "./types";

export const getMeRoute = async (req: Request, res: Response) => {
  const auth0Id = req.auth?.payload.sub;

  if (auth0Id === undefined || auth0Id === "") {
    res.status(401).json("Unauthenticated");
    return;
  }

  try {
    const user = await getUser(auth0Id);

    if (user === null) {
      res.status(404).json("User not found");
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    handleError(error, res);
  }
};

export const createMeRoute = async (req: Request, res: Response) => {
  const auth0Id = req.auth?.payload.sub;

  if (auth0Id === undefined || auth0Id === "") {
    res.status(401).json("Unauthenticated");
    return;
  }

  try {
    const user = await createUser(auth0Id);

    res.status(200).json(user);
  } catch (error) {
    handleError(error, res);
  }
};

export const addUserIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth0Id = req.auth?.payload.sub;

  if (auth0Id === undefined || auth0Id === "") {
    res.status(401).json("Unauthenticated");
    return;
  }

  try {
    const user = await getUser(auth0Id);

    if (user === null) {
      res.status(404).json("User not found");
      return;
    }

    (req as AuthenticatedRequest).userId = user._id;

    next();
  } catch (error) {
    handleError(error, res);
  }
};
