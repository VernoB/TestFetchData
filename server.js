//use strict';

const express = require("express");
const http = require("http");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

const app = express();

app.set("port", process.env.HOST_PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use("/", require("./src/routes/fetchData"));
app.use("*", (req, res, next) => {
  res.status(404).send("Not Found");
});

function errorHandler(err, req, res, next) {
  if (typeof err === "string") err = new Error(err);
  console.error("logError", err.toString());
  console.log(err);
  next();
}

function logError(err, req, res, next) {
  res.status(500);
  res.send(err.toString());
}

app.use(errorHandler);
app.use(logError);

const server = http.createServer(app);
if (require.main === module) {
  server.listen(app.get("port")).on("listening", () => {
    console.log("listening on address ", +app.get("port"));
  });
  // .on("server is ready and running on port ", app.get("port"));
} else {
  console.log("the server is running as a module");
  module.exports = server;
}
