const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose.connect("mongodb://localhost:27017/notes");
  console.log("Connected to MongoDB successfully");
};

module.exports = connectToMongo;
