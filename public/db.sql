CREATE TABLE person (
id SERIAL NOT NULL PRIMARY KEY,
user_name VARCHAR(80),
email VARCHAR(80),
user_password VARCHAR(80),
user_address TEXT
);

CREATE TABLE dog (
id SERIAL NOT NULL PRIMARY KEY,
dog_name VARCHAR(80),
dog_size VARCHAR(80),
dog_breed VARCHAR(80),
dog_needs TEXT,
dog_owner INT REFERENCES person(id)
);
INSERT INTO person(user_name, email, user_password, user_address, person_username)
VALUES ('user_name'