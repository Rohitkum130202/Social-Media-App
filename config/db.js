const mongoose = require("mongoose");

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB Database");
  } catch (error) {
    console.error("Error while connecting to Database:", error.message);
  }
};

module.exports = DbConnect;
