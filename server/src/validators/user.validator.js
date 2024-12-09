import { body } from "express-validator";
import { userService } from "../service/user-service.js";

class UserValidator {
    register = [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Must provide a valid email address"),
        body("email")
            .custom(async (value) => {
                const user = await userService.findUserByEmail(value);
                if (user) {
                    return Promise.reject("User with that email allready exists");
                }
                return true;
            }),
        body("password")
            .isLength({ min: 8, max: 25 })
            .withMessage("Password must be between 8 to 35 character")
    ]
}

const uservalidator = new UserValidator();

export { uservalidator };