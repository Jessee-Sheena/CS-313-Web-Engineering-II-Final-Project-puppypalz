const express = require('express')
const PORT = process.env.PORT || 5000
var path = require('path');
const { Pool, Client } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://jawfaknlvbawjb:e4f77baf7d271c6b081b28aa0fd4db0c66cf7aa0bed18302b77d0f8cab00ce02@ec2-54-221-243-211.compute-1.amazonaws.com:5432/df0s9ajqukkj34?ssl=true";

const pool = new Pool({ connectionString: connectionString });
const client = new Client({ connectionString: connectionString });


var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
    app.get('/createUser', function (req, res) {
		console.log("you made it here");
		var personName = req.query.name;
		var personEmail = req.query.email;
		var personPassword = req.query.password;
		var personUsername = req.query.username;
		var personAddress = req.query.address;
		var personPetname = req.query.petName;
		var dogBreed = req.query.breed;
		var dogSize = req.query.size;
		var dogNeeds = req.query.comments;
		var person_id;
		var dog_id;

		person_query = "INSERT INTO  person(user_name, email, user_password, user_address, person_username) VALUES ('" + personName + "', '" + personEmail + "', '" + personPassword + "', '" + personAddress + "', '" + personUsername + "') RETURNING id;";
		

		person_id = insertData(person_query);
		
		dog_query = "INSERT INTO  dog(dog_name, dog_size, dog_breed, dog_needs, dog_owner) VALUES ('" + personPetname + "', '" + dogBreed + "', '" + dogSize + "', '" + dogNeeds + "', '" + person_id + "') RETURNING id;";
		console.log(insertData(dog_query));
		/*var personJSON = result.rows;

		console.log("Results from DB: ");
		console.log(result.rows);
		pool.end();
		sendJSON(personJSON);*/
	//})
	//function sendJSON(request) {
		//res.write(JSON.stringify(request));
		//res.end();
	//}
		function insertData(query) {
			pool.query(query, function (err, result) {
				if (err) {
					console.log("Error in query: ");
					console.log(err);
				}
				else {
					var id = result.rows[0].id;
					console.log(id);
					return id;
				}

			})

		}
})

	
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

		