require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

app.set("port", process.env.PORT || 3001);

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

app.use(cors({ origin: process.env.CORS_ALLOWED_ORIGIN }));

app.use("/api", routes);

// Listen for requests on this port
const server = app.listen(app.get("port"), () => {
  const port = server.address().port;
  console.log("Listening on port " + port);
});
