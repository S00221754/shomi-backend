import { Request, Response } from "express";
import profileService from "../services/profile.service";
import asyncHandler from "../utils/asyncHandler";

export const getProfileById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await profileService.getProfileById(id);
    res.json(result);
  }
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const result = await profileService.updateProfile(id, updates);
    res.status(200).json(result);
  }
);
