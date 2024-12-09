import { Sequelize } from "sequelize";
import sequelize from "../../config/db.config.js";
import { User } from "./user.modle.js";
import { City } from "./city.model.js";

City.belongsTo(User);
User.hasMany(City);

const db = {
  Sequelize,
  sequelize,
  User,
  City,
};

export default db;
