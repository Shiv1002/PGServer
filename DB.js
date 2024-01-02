const { default: mongoose } = require("mongoose");

const DB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";
async function Connect_DB() {
  await mongoose
    .connect(DB_URL + "/PG")
    .then(() => {
      console.log("DB connection is successfull!", DB_URL);
    })
    .catch((e) => {
      console.log("Error occured", e.message);
    });
}

module.exports = Connect_DB;
