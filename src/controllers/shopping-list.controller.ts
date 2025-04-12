import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import shoppingListService from "../services/shoppingList.service";

export const getShoppingListForUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await shoppingListService.getShoppingListForUser(userId);
    res.json(result);
  }
);

export const addShoppingListItem = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await shoppingListService.addShoppingListItem(req.body);
    res.status(201).json(result);
  }
);

export const updateShoppingListItem = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await shoppingListService.updateShoppingListItem(
      id,
      req.body
    );
    res.json(result);
  }
);

export const deleteShoppingListItem = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await shoppingListService.deleteShoppingListItem(id);
    res.status(204).send();
  }
);

export const markBought = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await shoppingListService.markShoppingListItemAsBought(id);
  res
    .status(200)
    .json({ message: "Item marked as bought and moved to pantry." });
});
