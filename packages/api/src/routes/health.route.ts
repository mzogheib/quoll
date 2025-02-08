import { Request, Response } from "express";

export const getHealthRoute = async (_: Request, res: Response) => {
  res.status(200).json({ status: "healthy" });
};
