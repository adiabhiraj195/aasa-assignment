import { Router } from "express";
import { userController } from "../controller/user/user.controller.js";
import { uservalidator } from "../validators/user.validator.js";

const userRouter = Router();

userRouter.post("/", uservalidator.register, userController.register);
// userRouter.post("/", userController.register);


export default userRouter;