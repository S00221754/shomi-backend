import { Router } from "express";
import * as profileController from "../controllers/profile.controller";

const router = Router();

router.get("/:id", profileController.getProfileById);

router.patch("/:id", profileController.updateProfile);

export default router;
