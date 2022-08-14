const Photo = require("../models/Photo");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const path = require("path");
const ejs = require("ejs");

exports.getAllPhotos = async (req, res, next) => {
  const page = req.query.page || 1; //if there is a page number, use it, otherwise use 1.
  const limit = 2;
  const totalPhoto = await Photo.find().countDocuments(); //total number of photos in the database. //veri tabanındaki fotoğrafların sayısını bulur.
  const photos = await Photo.find({})
    .sort("-date")
    .skip((page - 1) * limit) //her sayfada 2 tane fotoğraf gösterilir.
    .limit(limit); //skip the first 2 photos, and show the next 2 photos.

  res.render("index", {
    photos: photos,
    current: page,
    pages: Math.ceil(totalPhoto / limit), //ceil is used to round up the number.
  });
};

exports.getPhoto = async (req, res, next) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", { photo }); //photo sayfasına tıklanan id'yi gönderir.
};

exports.createPhoto = async (req, res, next) => {
  const uploadDir = "public/uploads"; //path to the uploads folder
  if (!fs.existsSync(uploadDir)) {
    //if the upload directory doesn't exist, create it.
    fs.mkdirSync(uploadDir); //create the upload directory
  }

  let uploadImage = req.files.image;
  let uploadImagePath = __dirname + "/../public/uploads/" + uploadImage.name; //path to the image

  uploadImage.mv(uploadImagePath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadImage.name,
    });
    res.redirect("/"); //home page redirect
  });
};

exports.updatePhoto = async (req, res, next) => {
  const photo = await Photo.findById({ _id: req.params.id }); //fotografa ait data alınır.
  photo.title = req.body.title; //title değeri güncellenir.
  photo.description = req.body.description; //description değeri güncellenir.
  photo.save(); //güncellenen değerleri kaydet.
  res.redirect(`/photos/${req.params.id}`); //home page redirect
};

exports.deletePhoto = async (req, res, next) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + "/../public" + photo.image; //path to the image
  fs.unlinkSync(deletedImage); //delete the image  , files is the path to the image
  await Photo.findByIdAndRemove({ _id: req.params.id }); //delete the photo from the database
  res.redirect("/");
};
