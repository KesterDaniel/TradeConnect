const nodemailer = require("nodemailer")


function message(merchantEmail, msgTxt){

  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: 'kesterdan17@gmail.com',
      pass: "08163714177"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  var mailOptions = {
    from: 'kesterdaniel401@gmail.com',
    to: merchantEmail,
    subject: 'Sending Email using Node.js',
    text: msgTxt
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = message