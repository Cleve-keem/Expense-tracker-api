import { Router } from "express";
import UserController from "../services/user.service.js";

const router = Router();

router.get("/", UserController.getUserProfile);

export default router;
