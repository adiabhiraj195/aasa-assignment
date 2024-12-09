import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";

const PORT = process.env.PORT;
// const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is Live at Port: ${PORT}`);
});

// mongoose.connection.once("open", () => {
//     console.log("mongoose is connected");
// });
// mongoose.connection.on("error", (err) => {
//     console.log(err);
// });

// async function startServer() {
//   await mongoose.connect(MONGO_URL);
// }

// startServer();
