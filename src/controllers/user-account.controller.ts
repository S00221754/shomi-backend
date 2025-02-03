import { Request, Response } from "express";
import userService from "../services/user.service";
import asyncHandler from "../utils/asyncHandler";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const result = await userService.createUser(name, email, password);
  res.json(result);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await userService.loginUser(email, password);
  res.json(result);
});
