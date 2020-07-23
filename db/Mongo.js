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

//creating the UserSchema for saving data in DB
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
};


//creating the User Class + and users Collection

const User = mongoose.model("User", userSchema);

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
    console.log(user)
    user.save();


    console.log('New Mongo User Created...')

}





module.exports = {
    User,
    createMongoUser,
    mongoConnect,
}