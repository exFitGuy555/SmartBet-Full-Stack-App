/*

NEED TO RE-CONNECT 
MAILGUN BLOCKED MY USER BECUASE OF TOO MANY REQUESTS........TEST LIFE I GUESS

const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

//inserting auth keys
const auth = {
    auth: {
        api_key: '5544ec127941558b72adb883997954c5-a83a87a9-dea78397',
        domain: 'sandbox4d88769a050445438024f7cb52c509d6.mailgun.org'
    }
};

//creating the transporter - will execute everything
const transporter = nodemailer.createTransport(mailGun(auth));


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


module.exports = sendMail; */