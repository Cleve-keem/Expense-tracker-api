import { Router } from "express";
import DashboardController from "../controllers/dashboard.controller.js";
import authentication from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authentication);

router.get("/summary", DashboardController.getOverview);

export default router;
