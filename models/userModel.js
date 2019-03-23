const { Pool, Client } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://jawfaknlvbawjb:e4f77baf7d271c6b081b28aa0fd4db0c66cf7aa0bed18302b77d0f8cab00ce02@ec2-54-221-243-211.compute-1.amazonaws.com:5432/df0s9ajqukkj34?ssl=true";

const pool = new Pool({ connectionString: connectionString });
const client = new Client({ connectionString: connectionString });

function insertUser(name, email, password, address, username, petName, breed, size, needs, callback) {
	query = "INSERT INTO  person(user_name, email, user_password, user_address, person_username) VALUES ('" + name + "', '" + email + "', '" + password + "', '" + address + "', '" + username + "') RETURNING id;";

	pool.query(query, function (err, result) {
		if (err) {
			console.log("Error in query: ");
			console.log(err);
		}
		else {
			var id = result.rows[0].id;
			
			insertDog(petName, breed, size, needs, id, function (err, details) { });
			callback(null, result);
		}

	});
	
}
function insertDog(petName, breed, size, needs, personId, callback) {
	dog_query = "INSERT INTO  dog(dog_name, dog_size, dog_breed, dog_needs, dog_owner) VALUES ('" + petName + "', '" + breed + "', '" + size + "', '" + needs + "', '" + personId + "');";
	pool.query(dog_query, function (err, result) {
		if (err) {
			console.log("Error in query: ");
			console.log(err);
		}
		else {
			
			callback(null, result);
		}
	});
}
function validateUser(username, callback) {
	query = "SELECT user_name, user_password FROM person WHERE person_username ='" + username + "';";
	pool.query(query, function (err, result) {
		if (err) {
			console.log("Error in query: ");
			console.log(err);
		}
		else {
			
			callback(null, result);
		}
	});
}
function getEvents(callback) {
	query = "SELECT id, title, event_url as url, class,  event_start as start, event_end as end FROM event;"
	pool.query(query, function (err, result) {
		if (err) {
			console.log("Error in query: ");
			console.log(err);
		} else {
			
			callback(null, result);
		}

		
	})

}
module.exports = {
	insertUser: insertUser,
	insertDog: insertDog,
	validateUser: validateUser,
	getEvents: getEvents
};
