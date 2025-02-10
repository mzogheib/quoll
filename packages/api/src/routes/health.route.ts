import { Request, Response } from "express";
import { getEnvVariable } from "../utils/env";

export const getHealthRoute = async (_: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "healthy", data: getEnvVariable("HEALTH_DATA") });
};
