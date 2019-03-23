const express = require('express');
var session = require('express-session');
const PORT = process.env.PORT || 5000;
var path = require('path');

const userController = require("./controllers/userController.js");
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', saveUninitialized: 'false' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', userController);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

