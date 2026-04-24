import { Router } from "express";
import SettingsController from "../controllers/settings.controller.js";
import authentication from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authentication);

router.get("/", SettingsController.getUserProfile);
router.patch("/", SettingsController.updateUserProfile);

export default router;
