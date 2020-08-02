/*Module dependencies*/
const express = require('express')
  http = require('http'),
  path = require('path');

  const mongo = require('./db/Mongo'),
  routes = require('./routes'),
  sql = require('./db/Sql')
  user = require('./routes/user'),
  socketIo = require('./util/socketIO'),
 bodyParser = require("body-parser"),
  sharedsession = require("express-socket.io-session");

  /* Call connect to Mongo */
  mongo.mongoConnect()


let app = express();
let server = http.createServer(app)
let io = require("socket.io")(server);


   
// all environments 
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views'); // *
app.set('view engine', 'ejs'); // *

//static files Scripts ans Styles
app.use("/public", express.static(__dirname + '/public'));
app.use("/views", express.static(__dirname + '/views'));


// App use 
app.use(session)
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // *


// development only
//Get
app.get('/', routes.index); //call for HOME  page
app.get('/stats', routes.stats); //call for STATS page
app.get('/contact', routes.contact); //call for signIn/Login page
app.get('/login', routes.login); //call for Login page
app.get('/Odds', routes.Odds); //call for Odds page
app.get('/login', routes.index); //call for login page masseges
app.get('/Chat', routes.Chat); //call for LiveChat page
app.get('/home/logout', user.Logout); //call for logout
app.get('/MyOdds', mongo.getBids); //call allBids for current logged in user 
app.get('/home/check', mongo.check); // development proposed Only - checking our Session
//Post
app.post('/Bids', mongo.getOddsLogin); //call for SaveBet (SaveBids)  in Odds page
app.post('/login', user.existSql); //call for login ==> will lead to Profile


 

//Server Listening...
 server.listen(process.env.PORT || 8080) 

 //export the neccecery tools for socket.io
 module.exports = {
   io,
   server,
   sharedsession,
   session,
   express
 }