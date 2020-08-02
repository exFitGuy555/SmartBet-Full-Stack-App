   /* Module dependencies */
   var {
       app
   } = require('../app')
   let server = require("http").createServer(app)
   let io = require("socket.io")(3000)
   const express = require('express')
   let bodyParser = require("body-parser"); //
   let sharedsession = require("express-socket.io-session");
   app = express();

   // App use 
   app.use(session = require('express-session')({
       secret: 'keyboard cat',
       resave: false,
       saveUninitialized: true,
       cookie: {
           maxAge: 365 * 24 * 60 * 60 * 1000
       }
   }))
   app.use(bodyParser.urlencoded({
       extended: false
   }));
   app.use(bodyParser.json()); // *


   //sessionHandler
   io.use(sharedsession(session));


       //onConnection 
       //validation at index.js
       io.on('connection', socket => {
           socket.on('new-user', name => {
               name = socket.handshake.session.user.username;
               socket.broadcast.emit('user-connected', name)
               console.log('user connected....')

           })
           socket.on('send-chat-message', message => {
               socket.broadcast.emit('chat-message', {
                   message: message,
                   name: socket.handshake.session.user.username
               }) // will send to everybody expect te sender

           })
           socket.on('disconnect', () => {
               socket.broadcast.emit('user-disconnected', socket.handshake.session.user.username)
               console.log('user disconnected....')
           });


       })

    
   