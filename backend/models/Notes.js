const mongoose = require("mongoose");
const { Schema } = mongoose;

//creation of new Schema in which the detail and type-attributes are been included.

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    required: Date.now,
  },
});

model.exports = mongoose.model("notes", NotesSchema);
