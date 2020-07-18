const mysql = require('mysql');
const Joi = require("@hapi/joi");
const bcrypt = require('bcrypt');
const saltRounds = 12;

//------------------------------SQL Connection---------------------------------------------------------
let connection = mysql.createConnection({
   host: 'localhost',
   user: 'exFitguy555',
   password: 'Wwewwe55',
   database: 'SmartBet'
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


//---------------------------------------------signup page call------------------------------------------------------

//first we validate all client-side info with hapi/joi
function validate(body) {
   const schema = Joi.object({
      username: Joi.string().min(3),
      email: Joi.string().min(6).max(255).required().email(),
      password: Joi.string().min(6).max(1024).required()
   });

   //tshow full list of errors
   return schema.validate(body, {
      abortEarly: false
   });
}


exports.signup = async (req, res) => {
   message = '';
   if (req.method == "POST") {
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds)


      const username = req.body.username;
      const email = req.body.email;
      password = hashPassword;

      const {
         error
      } = validate(req.body);

      if (error) {
         messagee = error.details.map((err) => err.message);
         res.render('contact.ejs', {
            message: messagee
         });
      }



      let sql = "INSERT INTO `users`(username,email,password) VALUES (?, ? , ?)";


      connection.query(sql, [username, email, password], (err) => {
         if (err) {
            console.log({
               err
            })

         }

         message = "Succesfully! Your account has been created, please log in";
         res.render('contact.ejs', {
            message: message
         });
      });

   }
};

//-----------------------------------------------login page call------------------------------------------------------
exports.login = function (req, res) {
   var message = '';
   var sess = req.session;

   if (req.method == "POST") {
      let username = req.body.username;
      let password = req.body.password;

      let sql = "SELECT * FROM `users` WHERE `username`='" + username + "' and password = '" + password + "'";
      connection.query(sql, function (err, results) {
         if (results.length) {
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/Home/dashboard');
         } else {
            message = 'Wrong Credentials.';
            res.render('Login.ejs', {
               message: message
            });
         }

      });
   }

};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.dashboard = (req, res, next) => {
   let user = req.session.user.username,
      userId = req.session.userId;
   console.log('userId=' + userId);
   if (userId == null) {
      res.redirect("/login");
      return;
   }

   let sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

   connection.query(sql, (err, results) => {
      message = `Hi  ${user}  welcome back`
      res.render('dashboard.ejs', {
         message: message
      });
   });
};
//------------------------------------logout functionality----------------------------------------------
exports.logout = function (req, res) {
   req.session.destroy(function (err) {
      res.redirect("/login");

   })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function (req, res) {

   let userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }

   let sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
   connection.query(sql, function (err, result) {
      res.render('profile.ejs', {
         data: result
      });
   });
};