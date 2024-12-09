import { Router } from "express";

import user from "./user.route.js";
import auth from "./auth.router.js";
import city from "./city.router.js";

const router = Router();

router.use("/user", user);
router.use("/auth", auth);
router.use("/city", city);

export default router;
