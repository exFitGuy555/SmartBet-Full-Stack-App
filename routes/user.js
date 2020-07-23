const Joi = require("@hapi/joi");
const bcrypt = require('bcrypt');
const saltRounds = 12;
const {
   insertNewUserToSQL,
   connection, checkPassword
} = require('../db/Sql');
const {
   createMongoUser, User, getExistingUserMongo
} = require('../db/Mongo'); // פונקצית ההופסת משתמש למונגו + מספר רנדמולי
const {
   Connection
} = require("mongoose");

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


const signup = async (req, res) => {
   message = '';
   const {
      error
   } = validate(req.body);

   if (error) {
      message = error.details.map((err) => err.message);
      res.render('contact.ejs', {
         message: message
      });
   }

   if (req.method == "POST") {
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds)

      const username = req.body.username;
      const email = req.body.email;
      password = hashPassword;

      
      //validate username and password
       if ((password.length < 6 || username.length < 3)) {
          console.log({
            err
          })
       }


      const sqlRes = insertNewUserToSQL(username, email, password);

   
       //mongo user creation
      let mongoResults = createMongoUser(sqlRes[0], mongoNum,username)
      console.log(mongoResults)
      
      //send mongoResults.randNumber + uuid + username back to client (render) 
      res.render('dashboard.ejs', {
         message: `hi ${sqlRes[1]} ${sqlRes[0]} ${mongoNum}`
         //sqlRes.name 
         //sqlRes.uuid
         //mongoResults.rand 
      });
   }

}


//-----------------------------------------------login page call------------------------------------------------------

   const existSql = checkPassword;
   
 
 ///To do => => =>      resMongo=getExisingUser by his(resSql.uuid)
//then render  the massage below


//-----------------------------------------------dashboard page functionality----------------------------------------------
//here we can call function sql and mongo again , extract uuid rand num and username again and render it in dashboard below as massage
const dashboard = (req, res, next) => {
   let user = req.session.user.username,
      userId = req.session.userId;

   let sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

   connection.query(sql, (err, results) => {
      
      res.render('dashboard.ejs', {
         message: `Hi  ${user} ${userId} welcome back`
      });

   });

         return userId,user

};



//------------------------------------logout functionality----------------------------------------------
const logout = function (req, res) {
   req.session.destroy(function (err) {
      res.redirect("/login");

   })
};
//--------------------------------render user details after login--------------------------------

const profile = function (req, res) {
   let userId = req.session.userId;
   let user = req.session.user.username;
  const getExistingUserMongo = User.findOne({
        uuid: userId
     })
     .exec(function (err, user) {
        if (user) {
           console.log(user)
        }

     });

      res.render('profile.ejs', {
         message: `HI ${user}`
      });
   }

module.exports = {
   existSql,
   signup,
   dashboard,
   logout,
   profile,
}