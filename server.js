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

router.route("/students")
  .get(async function(req, res) {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  })
  .post(async function(req, res) {
    let student = new Student();
    student.name            = req.body.name;
    student.numberOfCourses = req.body.numberOfCourses;
    try {
      await student.save();
      res.json({ message: "Student added to database." });
    } catch (error) {
      res.send(error);
    }
  });

router.route("/students/:student_id")
  .get(async function(req, res) {
    try {
      const student = await Student.findById(req.params.student_id);
      res.send(student);
    } catch (error) {
      res.send(error);
    }
  })
  .put(async function(req, res) {
    try {
      const student = await Student.findById(req.params.student_id);
      if(!student) {
        return res.status(404).send("Student not found");
      }

      student.name = req.body.name;
      student.numberOfCourses = req.body.numberOfCourses;

      try {
        await student.save();
        res.json({ message: "Student successfully updated." });
      } catch (error) {
        res.status(500).send({ message: "Error saving student", error: saveError });
      }
    } catch (error) {
      res.status(500).send({ message: "Error finding student", error: error });
    }
  });

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server has started in port ${port}`);
});
