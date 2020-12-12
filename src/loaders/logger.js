const logger = require("morgan");

module.exports = (app) => {
  app.use(logger("dev"));
};
