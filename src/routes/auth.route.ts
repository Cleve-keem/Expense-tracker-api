import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { validator } from "../middlewares/validator.js";
import { loginSchema, registerationSchema } from "../schemas/auth.js";
import { requestResetSchema } from "../schemas/passwordReset.js";
import authentication from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  validator(registerationSchema),
  AuthController.createUser,
);

router.post("/login", validator(loginSchema), AuthController.authenticateUser);
router.post("/refresh", authentication, AuthController.refresh);
router.post(
  "/password-reset-request",
  validator(requestResetSchema),
  AuthController.forgetPassword,
);

export default router;
