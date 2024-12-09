import { Router } from "express";
import { authValidator } from "../validators/auth.validator.js";
import { authController } from "../controller/auth/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", authValidator.login, authController.login);

export default authRouter;
