// import UserModle from "../db/modle/user.modlejs";
import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/modle/index.js";

class UserService {
  createUser = async (fName, email, password) => {
    const salt = await genSalt();
    const hashPassword = await hash(password, salt);
    await db.User.create({
      userName: fName,
      email: email,
      password: hashPassword,
    });
    console.log("userCreated");
  };

  findUserByEmail = async (email) => {
    const user = await db.User.findOne({ where: { email } });
    return user;
  };

  checkPassword = async (inputPassword, checkPassword) => {
    return await compare(inputPassword, checkPassword);
  };

  generateAuthResponse = async (user) => {
    // const requestUser = await this.getRequestUser(user);
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
    // console.log(accessToken)
    // const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
    //     expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    // });
    //todo: Add code to update refresh token schema in database

    return { accessToken };
  };

  addCity = async (city, email) => {
    await db.City.create({
      city: city,
      email: email,
    });
  };
  getCitys = async (email) => {
    return await db.City.findAll({
      where: {
        email,
      },
    });
  };
}

const userService = new UserService();
export { userService };
