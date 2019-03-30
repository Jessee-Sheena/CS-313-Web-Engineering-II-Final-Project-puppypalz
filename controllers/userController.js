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
				sess.userId = results.rows[0].id;
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
				
		sending = {
			"success": 1,
			"result": result.rows
		}			
		
		res.send(sending);
	});
});
router.post('/createUser', function (req, res) {
	sess.req.session;
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
	userModel.insertUser(name, email, password, address, username, petName, breed, size, needs, function (err, result) {
		sess.userId = result.rows[0].id;
		sess.username = username;
		sess.name = name;
		
		
		
	});
	
}
	
);
router.post('/insertEvent', function (req, res) {
	sess = req.session;
	var day = req.body.date;	
	var time = req.body.time;
	
	var date = day + " " + time;
	console.log(date);
	var d = new Date(date);	
	var start = d.getTime();
	var endDate = d.setMinutes(d.getMinutes() + 25);
	console.log(endDate);
	
	var end = endDate;
	var id = sess.userId;	
	userModel.insertEvent(start, end, id, function (err, results) {
		res.redirect('/admin');
	})

});


module.exports = router;
