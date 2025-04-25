import { Response } from "express";
import userIngredientService from "../services/userIngredient.service";
import asyncHandler from "../utils/asyncHandler";
import {
  UpdateUserIngredientDTO,
  UserIngredientInput,
} from "types/userIngredient";
import { AuthenticatedRequest } from "middleware/authMiddleware";
import { PaginatedResponse } from "types/response";
import { UserIngredient } from "entities/UserIngredient";

// create user ingredient
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

// get all user ingredients
export const getUserIngredients = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.sub;
    const result = await userIngredientService.getUserIngredients(userId);
    res.status(200).json(result);
  }
);

// get user ingredient by id
export const getUserIngredientById = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = req.params.id;
    const result = await userIngredientService.getUserIngredientById(id);
    res.status(200).json(result);
  }
);

// get user ingredients in a paginated format
export const getPaginatedUserIngredients = asyncHandler(
  async (
    req: AuthenticatedRequest,
    res: Response<PaginatedResponse<UserIngredient>>
  ) => {
    const userId = req.user?.sub;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { data, total } =
      await userIngredientService.getPaginatedUserIngredients(
        userId,
        page,
        limit
      );

    res.status(200).json({
      data,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  }
);

// update user ingredient
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

// quick restock user ingredient (deprecated as add to list feature was implemented but kept for future use)
export const quickRestockUserIngredient = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userIngredientId = req.params.id;
    const result = await userIngredientService.quickRestockUserIngredient(
      userIngredientId
    );
    res.status(200).json(result);
  }
);

// delete user ingredient
export const deleteUserIngredient = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const ids: string[] = req.body.userIngredientIds;
    await userIngredientService.deleteUserIngredient(ids);
    res.status(204).send();
  }
);

// get user ingredient by ingredient id
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
