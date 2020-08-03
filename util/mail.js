

const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
require('dotenv').config()

//inserting auth keys
const auth = {
    auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN
    }
};



//creating the transporter - will execute everything
let transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (username, email, showerr) => {

    //mailGun configuration
    const mailOptions = {
        from: email,
        to: 'guy.finkelshtein5@gmail.com',
        subject: username + 'been registered',
        text: 'Hi! Your Registration completed successfully!'
    };

    //sending our email directly
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            showerr(err, null);
        } else {
            showerr(null, data);
        }


    })
};

sendMail('','','',function(err, data){

}); 


module.exports = sendMail; 