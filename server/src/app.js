import express from "express";
import cors from "cors";
import morgan from "morgan";

import router from "./routers/index.router.js";
import db from "./db/modle/index.js";

const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
  })
);

app.use(router);
// middleware to error handel;

// db.sequelize;
// .sync({ force: true })
db.sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
