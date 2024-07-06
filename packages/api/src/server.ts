import dotenv from "dotenv";
import express from "express";

const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

dotenv.config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

const app = express();

app.set("port", process.env.PORT || 3001);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors({ origin: process.env.CORS_ALLOWED_ORIGIN }));

app.use("/api", routes);

const port = app.get("port");

app.listen(port, () => console.log("Listening on port " + port));
