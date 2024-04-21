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

// TODO understand wtf is going on with nodemon and express.
// Seems like the express server stays alive when nodemon restarts the app, which leads to port in use error "Error: listen EADDRINUSE :::3001"
// Looks related https://github.com/remy/nodemon/issues/1247

// Below makes it better sometimes. Inspired by http://glynnbird.tumblr.com/post/54739664725/graceful-server-shutdown-with-nodejs-and-express
// This function is called when you want the server to die gracefully
// i.e. wait for existing connections
const gracefulShutdown = () => {
  console.log("Received kill signal, shutting down gracefully.");
  server.close(() => {
    console.log("Closed out connections.");
    process.exit(0);
  });

  // if after
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down.",
    );
    process.exit(0);
  }, 10 * 1000);
};

// listen for TERM signal .e.g. kill
process.on("SIGTERM", gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on("SIGINT", gracefulShutdown);

// e.g. used by nodemon, type rs while nodemon is running
process.once("SIGUSR2", gracefulShutdown);

// ...
