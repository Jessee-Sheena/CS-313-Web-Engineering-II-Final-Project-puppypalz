const express = require('express')
const PORT = process.env.PORT || 5000
var path = require('path');

express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
	.get('/getRate', (req, res) => {
		var weight = Number(req.query.weight);
		var postType = req.query.postType;

		var rate = calculateRate(weight, postType)
		var t = getType(postType);
		console.log(rate);

		var param = {
			t: t,
			weight: weight,
			rate: rate
			
		};

		res.render("pages/getRate", param);
	})
	
	.listen(PORT, () => console.log(`Listening on ${PORT}`))
function calculateRate(weight, type) {
	switch (type) {
		case "stamped":
		    console.log("it made it here")
			if (weight < 1) {
				console.log("this is the weight")
				return  "$0.55";
				
			}
			else if (weight > 1 && weight < 3) {
				return "$0.70";
			}
			else if (weight > 2 && weight < 4) {
				return "$0.85";
			}
			else if (weight > 3 && weight <= 3.5) {
				return "$1.00";
			}
			else {
				return "not available in this type of post, Please select a different option"
			}
			
			break;
		case "metered":
			if (weight < 1) {
				return "$0.50";
			}
			else if (weight > 1 && weight < 3) {
				return "$0.65";
			}
			else if (weight > 2 && weight < 4) {
				return "$0.80";
			}
			else if (weight > 3 && weight <= 3.5) {
				return "$0.95";
			}
			else {
				return "not available in this type of post, Please select a different option"
			}
			break;
		case "flats":
			if (weight < 1) {
				return "$1.00";
			}
			else if (weight > 1 && weight < 3) {
				return "$1.15";
			}
			else if (weight > 2 && weight < 4) {
				return "$1.30";
			}
			else if (weight > 3 && weight < 5) {
				return "$1.45";
			}
			else if (weight > 4 && weight < 6) {
				return "$1.60";
			}
			else if (weight > 5 && weight < 7) {
				return "$1.75";
			}
			else if (weight > 6 && weight < 8) {
				return "$1.90";
			}
			else if (weight > 7 && weight < 9) {
				return "$2.05";
			}
			else if (weight > 8 && weight < 10) {
				return "$2.20";
			}
			else if (weight > 9 && weight < 11) {
				return "$2.35";
			}
			else if (weight > 10 && weight < 12) {
				return "$2.50";
			}
			else if (weight > 11 && weight < 13) {
				return "$2.65";
			}
			else if (weight > 12 && weight <= 13) {
				return "$2.80";
			}
			else {
				return "not available in this type of post, Please select a different option"
			}
			
			break;
		case "package":
			if (weight < 5) {
				return "$3.66";
			}
			else if (weight > 4 && weight < 9) {
				return "$4.39";
			}
			else if (weight > 8 && weight < 13) {
				return "$5.19";
			}
			else if (weight == 13) {
				return "$5.71";
			}
			else {
				return "not available in this type of post, Please select a different option"
			}
			break;
	}
}
function getType( type) {
	switch (type) {
		case "stamped":
			return "Letters (stamped)";
			break;
		case "metered":
			return "Letters(metered)";
			break;
		case "flats":
			return "Large Envelopes(flats)";

			break;
		case "package":
			return "First - Class Package Service Retail";
			break;
	}
}