import { Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import shoppingListService from "../services/shoppingList.service";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const getShoppingListForUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.sub;
    const result = await shoppingListService.getShoppingListForUser(userId);
    res.json(result);
  }
);

export const addShoppingListItem = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.sub;
    const result = await shoppingListService.addShoppingListItem({
      ...req.body,
      user_id: userId,
    });
    res.status(201).json(result);
  }
);

export const updateShoppingListItem = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const result = await shoppingListService.updateShoppingListItem(
      id,
      req.body
    );
    res.json(result);
  }
);

export const deleteShoppingListItem = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    await shoppingListService.deleteShoppingListItem(id);
    res.status(204).send();
  }
);

export const markBought = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    await shoppingListService.markShoppingListItemAsBought(id);
    res
      .status(200)
      .json({ message: "Item marked as bought and moved to pantry." });
  }
);
