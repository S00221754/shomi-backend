import { Response } from "express";
import userIngredientService from "../services/userIngredient.service";
import asyncHandler from "../utils/asyncHandler";
import {
  UpdateUserIngredientDTO,
  UserIngredientInput,
} from "types/userIngredient";
import { AuthenticatedRequest } from "middleware/authMiddleware";

export const createUserIngredient = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.sub;
    const userIngredientInput: UserIngredientInput = {
      ...req.body.userIngredient,
      user_id: userId,
    };
    const result = await userIngredientService.addUserIngredient(
      userIngredientInput
    );
    res.status(201).json({ id: result.id });
  }
);

export const getUserIngredients = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.sub;
    const result = await userIngredientService.getUserIngredients(userId);
    res.status(200).json(result);
  }
);

export const getUserIngredientById = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = req.params.id;
    const result = await userIngredientService.getUserIngredientById(id);
    res.status(200).json(result);
  }
);

export const updateUserIngredient = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = req.params.id;
    const updatedIngredient: UpdateUserIngredientDTO = req.body;
    const result = await userIngredientService.updateUserIngredient(
      id,
      updatedIngredient
    );
    res.status(200).json(result);
  }
);

export const quickRestockUserIngredient = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userIngredientId = req.params.id;
    const result = await userIngredientService.quickRestockUserIngredient(
      userIngredientId
    );
    res.status(200).json(result);
  }
);

export const deleteUserIngredient = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const ids: string[] = req.body.userIngredientIds;
    await userIngredientService.deleteUserIngredient(ids);
    res.status(204).send();
  }
);

export const getUserIngredientByIngredientId = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.sub;
    const ingredientId = req.params.ingredientId;
    const result = await userIngredientService.getUserIngredientByIngredientId(
      userId,
      ingredientId
    );
    res.status(200).json(result);
  }
);
