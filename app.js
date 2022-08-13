const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = express();

//template engine setup
app.set("view engine", "ejs"); //set the view engine to ejs , used ejs for templating

//middleware
app.use(express.static("public"));

//routes
app.get("/", (req, res, next) => {
  res.render("index"); //first render the index.ejs file
});

app.get("/about", (req, res, next) => {
  res.render("about"); //first render the index.ejs file
});

app.get("/addPhoto", (req, res, next) => {
  res.render("addPhoto"); //first render the index.ejs file
});

app.post("/photos", (req, res, next) => {
  console.log(req.body);
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
