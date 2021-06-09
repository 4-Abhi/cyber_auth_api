const mongoose = require("mongoose");

const db = "mongodb://127.0.0.1:27017/AuthApis";

mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then((data) => {
    console.log("Db Connected");
  });

module.exports = mongoose;
