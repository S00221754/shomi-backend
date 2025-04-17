import { Router } from "express";
import * as profileController from "../controllers/profile.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.get("/:id", profileController.getProfileById);
router.patch("/:id", profileController.updateProfile);

export default router;
