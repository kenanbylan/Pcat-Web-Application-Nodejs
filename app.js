const express = require("express");
const path = require("path");
const app = express();

//middleware
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "temp/index.html"));
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
