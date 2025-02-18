import express from "express";
import bodyParser from "body-parser";
import { db } from "./database/db.js";
import { userRouter } from "./routes/index.js";
import { authRouter } from "./routes/index.js";
import dotenv from "dotenv";
import { createUploadsFolder } from "./security/helper.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use("/api/auth", authRouter); 
app.use("/api/users", userRouter); 

createUploadsFolder();
app.listen(port, function () {
  console.log("project running in port ");
  db();
});