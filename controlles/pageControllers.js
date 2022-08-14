const Photo = require("../models/Photo");

exports.getAboutPage = (req, res, next) => {
  res.render("about"); //first render the index.ejs file
};

exports.getAddPhotoPage = (req, res, next) => {
  res.render("addPhoto"); //first render the index.ejs file
};

exports.getEditPhotoPage = async (req, res, next) => {
  const photo = await Photo.findById({ _id: req.params.id });
  res.render("edit", { photo });
};
