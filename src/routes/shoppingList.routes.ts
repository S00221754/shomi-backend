import express from "express";
import * as shoppingListController from "../controllers/shopping-list.controller";

const router = express.Router();

router.get("/:userId", shoppingListController.getShoppingListForUser);

router.post("/", shoppingListController.addShoppingListItem);

router.patch("/:id", shoppingListController.updateShoppingListItem);

router.delete("/:id", shoppingListController.deleteShoppingListItem);

router.patch("/mark-bought/:id", shoppingListController.markBought);

export default router;
