const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./student")
const app = express();
const port = 3000;
const databaseUrl = "mongodb://localhost:27017/RestDatabase";

mongoose.connect(databaseUrl, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const router = express.Router();

router.use(function (req, res, next) {
	console.log("Received Request");
	next();
});

router.get("/", (req, res, next) => {
	res.json({ message: "Able to visit /api." });
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server has started in port ${port}`);
});
