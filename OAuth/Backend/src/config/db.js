const dns = require("node:dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const mongoose = require("mongoose");
const { URI } = require("./config");

if (!URI) {
  throw new Error("DB URI not found !");
}

const connectDB = async (cb) => {
  try {
    await mongoose.connect(URI);
    console.log("DB Connected !");
    cb();
  } catch (error) {
    throw new Error(`DB Connection Failed: ${error.message}`);
  }
};

module.exports = connectDB;
