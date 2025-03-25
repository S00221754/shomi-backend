import { Request, Response } from "express";
import profileService from "../services/profile.service";
import asyncHandler from "../utils/asyncHandler";

export const getProfileById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await profileService.getProfileById(id);
  res.json(result);
});