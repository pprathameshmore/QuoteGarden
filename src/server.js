const http = require("http");
const express = require("express");
const config = require("../src/configs/index");

const app = express();

require("./loaders/index")(app);
const server = http.createServer(app);
server.listen(config.PORT, () => {
  console.log("Server running on " + config.PORT);
});
