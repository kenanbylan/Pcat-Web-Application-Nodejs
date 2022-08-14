const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");

const ejs = require("ejs");

const {
  getAllPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
} = require("./controlles/photoControllers");
const {
  getAboutPage,
  getAddPhotoPage,
  getEditPhotoPage,
} = require("./controlles/pageControllers");

const app = express();

// connect to the database
mongoose
  .connect(
    "mongodb+srv://kenanbylan:ZvPDmFWxJaBwoXcj@cluster0.sktox8m.mongodb.net/pcat-db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

//template engine setup
app.set("view engine", "ejs"); //set the view engine to ejs , used ejs for templating

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //urldeki data okumamızı sağlar.
app.use(express.json()); //json formatında data okumamızı sağlar.
app.use(fileUpload()); //file upload işlemlerini yapmamızı sağlar.
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
); //method override işlemlerini yapmamızı sağlar.

//photos controller
app.get("/", getAllPhotos);
app.get("/photos/:id", getPhoto);
app.post("/photos", createPhoto);
app.put("/photos/:id", updatePhoto);
app.delete("/photos/:id", deletePhoto);

//page controllers
app.get("/about", getAboutPage);
app.get("/addPhoto", getAddPhotoPage);
app.get("/photos/edit/:id", getEditPhotoPage);

//server setup connection
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
