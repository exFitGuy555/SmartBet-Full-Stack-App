/* -----------------------------------------------------------------Mongo Connection----------------------------------------------------- */

const mongoose = require('mongoose');
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')
const {
    checkPassword
} = require('./Sql')



//Setting the environment variables
const connectionOptions = {
    username: process.env.MONGO_USER || 'Guy',
    password: process.env.MONGO_PASSWORD || 'Wwewwe55',
    host: process.env.MONGO_HOST || 'wizebet.qskkn.mongodb.net',
    db: process.env.MONGO_DB || 'Wizebet'
};

function createURI({
    username,
    password,
    host,
    db
}) {
    return `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority`; // My URI
}
//creating the connection to MongoDB
const mongoConnect = (options = connectionOptions) => {
    return mongoose.connect(createURI(options), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(console.log('Connected to MongoDB...'))
}

/* -------------------------------------------------Mongo models------------------------------------------------ */

//creating the UserSchema for saving Users in DB
const userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        min: 5,
        max: 255
    },
    mongoNum: {
        type: String,
    },
    CreateAt: {
        type: Date,
        default: Date.now,
    },
    teamA: {
        type: String,
    },
    teamB: {
        type: String,
    },
    OverUnder: {
        type: Number,
    },
    WinLose: {
        type: String,
    }
})






//adding token to the Schema => signing at Login
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
            uuid: this.uuid,
            mongoNum: this.mongoNum
        },
        process.env.JWT_TOKEN_KEY || "PrivateKey");

    return token;
}

const getToken = userSchema.methods.generateAuthToken()




//creating the User Class + and users Collection
const User = mongoose.model("User", userSchema);
//creating the User Class + and users Collection

//validate when Inserting user to  Mongo
function validateMongoUser(user) {
    const schema = Joi.object({
        uuid: Joi.string().min(5).max(255).required(),
        mongoNum: Joi.string().min(5).max(255).required()
    })

    return schema.validate(user, {
        abortEarly: true
    })
}

/* ``````````````````````````````````````````````````````````````````````Save User To Mongo----------------------------------------------- */
const rand = () => {
    return Math.floor(Math.random() * (99999999 - 100000 + 1) + 1000000);
}

mongoNum = rand();
const createMongoUser = async (uuid, mongoNum) => {
    const {
        error
    } = validateMongoUser(userSchema.body);
    if (error) {
        console.log({
            err
        })
    }

    let user = await User.findOne({
        uuid: uuid
    }, );
    if (user) {
        console.log({
            err
        })
    }

    user = new User({
        uuid,
        mongoNum
    });

    user.save();



    console.log('New Mongo User Created...')

}


//Go to profile after login
const profile = function (req, res) {

    message = '';
    if (req.session.user == undefined) {
        res.render('Contact.ejs'), {
            message: 'User Logged Out, please login again'
        }
        return;
    }
    let userId = req.session.userId;
    let user = req.session.user.username;
    let userAtSign = req.session.user;
    const getExistingUserMongo = User.findOne({
            uuid: userId
        })
        .exec(function (err, user) {
            if (err) {
                console.log(err)
            }

        });

    jwt.verify(getToken, 'PrivateKey', (err) => {
        if (err) {
            console.log('Login not Protected');
            res.render('login.ejs', {
                message: `Login not Protected`,
            });

        } else {
            console.log('Login Protected');

        }
    })

    if (!userAtSign) {
        res.render('profile.ejs', {
            message: `HI ${user}`,
        });
    }

    res.render('profile.ejs');



}





//Go to profile after login
const getOddsLogin = async function (req, res) {
    const {
        error
    } = validateMongoUser(userSchema.body);
    if (error) {
        console.log({
            err
        })
    }
    message = 'Please login to Save Your Odds'
    if (req.session.user == undefined) {
        res.render('Contact.ejs'), {
            message: message
        }
        return;
    }
    let userId = req.session.userId;
    const getExistingUserMongo = User.findOne({
            uuid: userId
        })
        .exec(function (err, user) {
            if (user) {
                console.log(userId)
            }

        });

    jwt.verify(getToken, 'PrivateKey', (err) => {
        if (err) {
            console.log('Login not Protected');
            res.render('login.ejs', {
                message: `Login not Protected`,
            });

        } else {
            console.log('Login Protected');

        }
    })

    /* ---------------------------beggining of save Bid procces */

    console.log(userId)
    console.log(req.body)
    const teamA = req.body.teamA
    const teamB = req.body.teamB
    const OverUnder = req.body.overUnder
    const WinLose = req.body.WinLose


    const uuid = userId;

    usermongo = new User({
        uuid,
        teamA,
        teamB,
        OverUnder,
        WinLose
    });

    usermongo.save();


}








//Logout function
const logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/login");

    })
};


//checking the session cookie
const check = (req, res) => {
    console.log(req.session.user)
}


const getBids = (req, res)  => {
 
    let userId = req.session.user.id
    User.find({
        uuid: userId
    }, function (err, result) {
        if (err) {
            console.log(err)
        }
         
                  
      result.shift()
      res.render('profileViewOdds.ejs', {
          message: 
          result.map(item => {
              return `Teams: ${item.teamA} ${item.teamB} ||
              OverUnder: ${item.OverUnder} ||
              ${item.WinLose}`



              
          })
      }) 
 })
}



/* function getById(id) {
    return users.find((user) => user.id == id);
}
 */
module.exports = {
    User,
    createMongoUser,
    mongoConnect,
    profile,
    logout,
    getOddsLogin,
    check,
    getBids
}