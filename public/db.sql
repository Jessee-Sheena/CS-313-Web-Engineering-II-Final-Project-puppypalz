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

CREATE TABLE event (
id SERIAL NOT NULL PRIMARY KEY,
title VARCHAR(80),
url VARCHAR(80),
class VARCHAR(80),
event_start float,
event_end float,
dog_id INT REFERENCES person(id),
person_id INT REFERENCES person(id)
);