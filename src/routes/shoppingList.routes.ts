import express from "express";
import * as shoppingListController from "../controllers/shopping-list.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

router.get("/", shoppingListController.getShoppingListForUser);

router.post("/", shoppingListController.addShoppingListItem);
router.patch("/:id", shoppingListController.updateShoppingListItem);
router.delete("/:id", shoppingListController.deleteShoppingListItem);
router.patch("/mark-bought/:id", shoppingListController.markBought);

export default router;
