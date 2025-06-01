import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { getEnvVariable } from "./utils/env";
import routes from "./routes";

const init = async () => {
  try {
    await mongoose.connect(getEnvVariable("MONGODB_CONNECTION_STRING"));
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }

  const app = express();

  app.set("port", getEnvVariable("PORT"));

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json());

  app.use(cors({ origin: getEnvVariable("CORS_ALLOWED_ORIGIN") }));

  app.use("/api", routes);

  const port = app.get("port");

  app.listen(port, () => console.log("Listening on port " + port));
};

init();
