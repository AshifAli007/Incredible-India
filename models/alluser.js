var mongoose = require("mongoose");

var newuserSchema = new mongoose.Schema({
	email : String,
	password : String
});

module.exports = mongoose.model("Newuser",newuserSchema);