const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const databaseUrl = "mongodb://localhost:27017/RestDatabase";

mongoose.connect(databaseUrl, { useNewUrlPaserr: true });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server has started in port ${port}`);
});
