 /* -----------------------------creating the db  connection------------------------------------------------------- */
 const mysql = require('mysql');
 const {
     v4: uuidV4
 } = require('uuid');
 const bcrypt = require('bcrypt');
 const {
     getExistingUserMongo
 } = require('./Mongo')


 let connection = mysql.createConnection({
     host: process.env.SQL_HOST || 'localhost',
     user: process.env.SQL_USER || 'exFitguy555',
     password: process.env.SQL_PASSWORD || 'Wwewwe55',
     database: process.env.SQL_DATABASE || 'SmartBet'
 });

 connection.connect((err) => {
     if (err) {
         console.log({
             err
         })
     }
     console.log('Connected to Mysql...')
 });


 global.db = connection;

 /* ----------------------------------------Sql Queries---------------------------------- */




 let sqlQuery = "INSERT INTO `users`(username,email,password,id) VALUES (?, ? , ?, ?)";


 const insertNewUserToSQL = (username, email, password) => {
     let id = uuidV4();
     connection.query(sqlQuery, [username, email, password, id], (err) => {

         if (err) {
             console.log({
                 err
             })

         }
     })

     return [id, username]
 }


 /*-----------------------------------------------------------------------------------Login Existing Users----------------------------------------------------------------------------------- */
 //Still need to ADD JWT 
 const checkPassword = (req, res) => {
     var sess = req.session;
     let username = req.body.username;
     
     //first well check if Username is Correct
     let sql1 = "SELECT * FROM `users` WHERE username = '" + username + "' "
     connection.query(sql1, async (err, results) => {
         if(results[0] == undefined){
               res.render('contact.ejs', {
                   message: 'Wrong Username'
               })
         }
         //then well check the crypted password and re-converted
         let uuid = results[0].id
         let userPassword = results[0].password
         let username = results[0].username
         const validPassword = await bcrypt.compare(req.body.password, userPassword)
         if (validPassword != true) {       //if the validPassword return as false =  password incorrect
             res.render('contact.ejs', {
                 message: 'Wrong passWord'
             })
         } else {
             let sql2 = "SELECT * FROM `users` WHERE  password = '" + userPassword + "'";
             connection.query(sql2, function (err, results) {
                 if (results.length) {
                     req.session.userId = results[0].id;
                     req.session.user = results[0];
                     res.redirect('/Home/dashboard'); //stay like that + massage below in dashboard page functionality
                     console.log(req.session.user)
                 }

             })
         }
     })
 }



 module.exports = {
     connection,
     insertNewUserToSQL,
     checkPassword,



 }