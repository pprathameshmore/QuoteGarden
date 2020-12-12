require("dotenv").config();

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  HOSTNAME: process.env.HOSTNAME,
  PORT: parseInt(process.env.PORT) || 3000,
  DB: {
    URL: process.env.DB_URL,
    NAME: process.env.DB_NAME,
  },
  API_PREFIX: process.env.API_PREFIX || "api",
};
