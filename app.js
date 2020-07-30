/*Module dependencies*/
const express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  sql = require('./db/Sql')
  mongo = require('./db/Mongo'),
  path = require('path');



  /* Call connect to Mongo */
  mongo.mongoConnect()


//const methodOverride = require('method-override');
const session = require('express-session'); // *
const app = express();
let bodyParser = require("body-parser"); //



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
    maxAge: 365 * 24 * 60 * 60 * 1000
  }
}))

// development only

app.get('/', routes.index); //call for HOME index page
app.get('/stats', routes.stats); //call for STATS page
app.get('/contact', routes.contact); //call for STATS page
app.get('/login', routes.login); //call for STATS page
app.get('/Odds', routes.Odds); //call for STATS page
app.post('/signup', user.signup); //call for signup post 
app.post('/Bids', mongo.getOddsLogin); //call for SaveBet post 
app.get('/login', routes.index); //call for login page
app.get('/getBids', mongo.getBids); //call for login page
app.post('/login', user.existSql); //call for login ==> will lead to Profile
app.get('/home/logout', user.Logout); //call for logout
app.get('/home/profile', user.existMongo); //call for User Profile and Find user info from mongo
app.get('/home/check', mongo.check); //FOR WHEN I NEED DETAILS ABOUT THE USER FOR SAVING
///Middleware

app.listen(process.env.PORT || 8080)