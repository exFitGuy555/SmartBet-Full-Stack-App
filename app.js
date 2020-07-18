/**
 * Module dependencies.
 */
const express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path');
//const methodOverride = require('method-override');
const session = require('express-session');  // *
const app = express();
let bodyParser = require("body-parser"); // *

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views'); // *
app.set('view engine', 'ejs'); // *
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // *

//static files Scripts ans Styles
app.use("/public", express.static(__dirname + '/public'));

// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ // *
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}))

// development only

app.get('/', routes.index); //call for HOME index page
app.get('/stats', routes.stats); //call for STATS page
app.get('/contact', routes.contact); //call for STATS page
app.get('/login', routes.login); //call for STATS page
app.post('/signup', user.signup); //call for signup post 
app.get('/login', routes.index); //call for login page
app.post('/login', user.login); //call for login post
app.get('/Home/dashboard', user.dashboard); //call for dashboard page after login
app.get('/home/logout', user.logout); //call for logout
app.get('/home/profile', user.profile); //to render users profile
//Middleware

app.listen(process.env.PORT || 8080)