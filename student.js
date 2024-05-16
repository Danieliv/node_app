const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
	name: String,
	numberOfCourses: Integer
});

module.exports = mongoose.model("Student", StudentSchema);  
