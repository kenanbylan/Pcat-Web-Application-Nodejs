const mongoose = require("mongoose");
const Scheam = mongoose.Schema;

// create a schema
const photoSchema = new Scheam({
  title: String,
  description: String,
  image: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
