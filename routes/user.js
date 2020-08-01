const Joi = require("@hapi/joi");
const bcrypt = require('bcrypt');
const saltRounds = 12;
const {
   insertNewUserToSQL,
   connection, getExistingUserSql
} = require('../db/Sql');
const {
   createMongoUser, User, profile, logout
} = require('../db/Mongo'); 
const {
   Connection
} = require("mongoose");

//---------------------------------------------signup page call--------------------------------------------------------

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
        var sess = req.session;
        let user = req.session.user

     

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
      var sess = req.session;
      req.session.user = username
      console.log(req.session)
      const sqlRes = insertNewUserToSQL(username, email, password);

   
       //mongo user creation
      let mongoResults = createMongoUser(sqlRes[0], mongoNum,username)
      console.log(mongoResults)


      //send mongoResults.randNumber + uuid + username back to client (render) 
      res.render('Login.ejs', {
         message: `Hi ${username} Please Verify Your Account`
         //sqlRes.name 
         //sqlRes.uuid
         //mongoResults.rand 
      });

   }
 
   return req.session.user
}


//-----------------------------------------------login page call---------------------------------------------------------

   const existSql = getExistingUserSql;
   const existMongo = profile
   

//--------------------------------Logout---------------------------------------------------------------------------------
 
const Logout = logout;


//--------------------------------SaveBet---------------------------------------------------------------------------------





//----------------------------------Export-All---------------------------------------------------------------------------
module.exports = {
   existSql,
   signup,
      Logout,
      existMongo,
}