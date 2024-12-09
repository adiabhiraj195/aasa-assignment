import { validationResult } from "express-validator";
import { userService } from "../../service/user-service.js";

class UserController {
  register = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      console.log(err);
      return res.status(400).json(err);
    }

    const { fName, email, password } = req.body;

    await userService.createUser(fName, email, password);

    return res.status(201).json({
      status: "ok",
    });
  };

  addCity = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      console.log(err);
      return res.status(400).json(err);
    }

    const { city } = req.body;
    const { email } = req.user;

    await userService.addCity(city, email);

    return res.status(201).json({
      status: "ok",
    });
  };

  getCity = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      console.log(err);
      return res.status(400).json(err);
    }

    const { email } = req.user;

    const response = await userService.getCitys(email);
    // console.log(response);
    return res.status(201).json({
      status: "ok",
      data: response,
    });
  };
}

const userController = new UserController();
export { userController };
