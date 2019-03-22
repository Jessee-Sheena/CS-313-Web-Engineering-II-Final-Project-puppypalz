const express = require('express');
var session = require('express-session');
const PORT = process.env.PORT || 5000;
var path = require('path');
var sess;
const userController = require("./controllers/userController.js");
console.log(userController);
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(session({ secret: 'secret' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', userController.startUp);
app.get('/login', userController.login);
app.post('/createUser', userController.createUser);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

