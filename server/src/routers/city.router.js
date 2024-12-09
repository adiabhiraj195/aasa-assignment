import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { userController } from "../controller/user/user.controller.js";

const cityRouter = Router();

cityRouter.post("/", authenticate, userController.addCity);
cityRouter.get("/", authenticate, userController.getCity);

export default cityRouter;
