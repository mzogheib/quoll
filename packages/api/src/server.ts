import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { getEnvVariable } from "./utils/env";
import routes from "./routes";

mongoose.connect(getEnvVariable("MONGODB_CONNECTION_STRING"));

const db = mongoose.connection;
if (!db) console.log("Error connecting DB");
else console.log("DB connected successfully");

const app = express();

app.set("port", getEnvVariable("PORT"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors({ origin: getEnvVariable("CORS_ALLOWED_ORIGIN") }));

app.use("/api", routes);

const port = app.get("port");

app.listen(port, () => console.log("Listening on port " + port));
