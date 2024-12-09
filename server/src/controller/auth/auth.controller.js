import { validationResult } from "express-validator";
import { userService } from "../../service/user-service.js";

class AuthController {
    login = async(req, res) => {
        const err = validationResult(req);
        if (!(err.isEmpty())) {
            return res.status(400).json(err);
        }

        const { email, password } = req.body;

        const user = await userService.findUserByEmail(email);
        // console.log(user.dataValues.documents);
        if (!user) {
            return res.status(400).json({
                error: "User is not found"
            });
        }
        const checkPassword = await userService.checkPassword(password, user.password);
        if(!checkPassword){
            return res.status(400).json({   
                error: "Password is not correct"
            });
        }

        const authResponse = await userService.generateAuthResponse(user);
        return res.status(200).json(authResponse);
    }
}

const authController = new AuthController();

export { authController };