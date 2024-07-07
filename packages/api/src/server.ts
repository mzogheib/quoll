import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

// Do this before import code which uses process.env
dotenv.config();

import routes from "./routes";

if (process.env.MONGODB_CONNECTION_STRING === undefined) {
  console.error("DB connection string is not set");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const db = mongoose.connection;
if (!db) console.log("Error connecting DB");
else console.log("DB connected successfully");

const app = express();

app.set("port", process.env.PORT || 3001);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors({ origin: process.env.CORS_ALLOWED_ORIGIN }));

app.use("/api", routes);

const port = app.get("port");

app.listen(port, () => console.log("Listening on port " + port));
