const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const DB = process.env.DB_URL;
mongoose.connect(DB).then(
  () => {
    console.log("Connected to database");
  },
  (err) => {
    console.log("error connecting database: ");
    console.log(err);
  }
);

module.exports = mongoose.connection;
