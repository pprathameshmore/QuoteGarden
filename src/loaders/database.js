const mongoose = require("mongoose");
const config = require("../configs/index");

mongoose
  .connect(config.DB.URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: config.DB.NAME,
  })
  .then(() => console.log("Connected to MongoDB server"))
  .catch((error) => console.log(error));

module.exports = mongoose;
