const userModel = require("../models/userModel.js");
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	sess = req.session;
	console.log(sess.username);
	if (sess.username) {
		res.redirect('/admin');
	} else {
		res.render("pages/index");
	}
});
router.get('/admin', function (req, res) {
	sess = req.session;
	if (sess.username) {
		res.render('pages/admin')
	} else {
		res.render("pages/index");
	}
});
router.get('/login', function(req, res) {
	sess = req.session;
	var username = req.query.username;
	var password = req.query.password;

	userModel.validateUser(username, function (err, results) {
		if (err) {
			res.send("Username");
		} else {
			if (password == results.rows[0].user_password) {
				sess.username = username;
				loginStatus = true;
				res.send(loginStatus);



			} else {
				loginStatus = false;
				res.send(loginStatus);
			}
		}
		
	});
});
router.get('/event', function (req, res) {
	userModel.getEvents(function (err, result) {
		var sending = [];
		var from = req.query.from;
		var to = req.query.to;
		console.log(from);
		console.log(to);
		/*for (var i = 0; i < result.rows.length; i++) {

			var temp = {
				"id": result[i].rows.id,
				"title": result[i].rows.title,
				"url": result[i].rows.url,
				"class": result[i].rows.class,
				"start": result[i].rows.start,
				"end": result[i].rows.end
			}*/
	   sending['result']= result.rows;
		


		var eventJSON = JSON.stringify(sending);
		console.log(eventJSON);

		console.log("Results from DB: ");
		

		res.send(sending['result']);
	});
});
router.post('/createUser', function (req, res) {
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
);


module.exports = router;
