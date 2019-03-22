const userModel = require("../models/userModel.js");
var session = require('express-session');
var sess;
function startUp(req, res) {
	sess = req.session;
	sess.username;
	sess.password;
	if (sess.username) {
		res.redirect('/admin');
	} else {
		res.render("pages/index");
	}
}
function createUser(req, res) {
	console.log("you made it here");
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var username = req.body.username;
	var address = req.body.address;
	var petName = req.body.petName;
	var breed = req.body.breed;
	var size = req.body.size;
	var needs = req.body.comments;
	userModel.insertUser(name, email, password, address, username, petName, breed, size, needs, function (err, results) {
		res.send(name)
		console.log(results);
	});
}
function login(req, res) {
	console.log("in the login function");
	var username = req.query.username;
	var password = req.query.password;
	
	userModel.validateUser(username, function (err, results) {
		if (password == results.rows[0].user_password) {
			sess.username = username;
			loginStatus = true;
			
		} else {
			loginStatus = false;
		}
			res.send(loginStatus);
	});
}

module.exports = {
	createUser: createUser,
	login: login,
	startUp: startUp
};

