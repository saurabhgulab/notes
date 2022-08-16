const mongoose = require("mongoose");

//connecting to the MongoDB database aka NoSQL database
const connectToMongo = () => {
  mongoose.connect("mongodb://localhost:27017/notes");
  console.log("Connected to MongoDB successfully");
};

module.exports = connectToMongo;
