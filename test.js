const mongoose = require("mongoose");

const Scheam = mongoose.Schema;

// connect to the database
mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create a schema
const photoSchema = new Scheam({
  title: String,
  description: String,
});

// create a model
const Photo = mongoose.model("Photo", photoSchema);

// create a new photo
// Photo.create({
//   title: "My second photo",
//   description: "This is my second photo",
// });

//read all the photos

// Photo.find({}, (err, data) => {
//   console.log(data);
//  });

//update to the photo
const id = "62f7ec22fb375609a281a121";
// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: "My updated photo",
//     description: "This is my updated photo",
//   },
//   {
//     new: true,
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );

//delete the photo
Photo.findByIdAndDelete(id, (err, data) => {
  console.log("data is deleted == ", data);
});
