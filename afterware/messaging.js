const nodemailer = require("nodemailer")


function message(merchantEmail, msgTxt){

  var transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    secure: true,
    port: 465,
    service: "gmail",
    auth: {
      user: 'tradeconnect59@gmail.com',
      pass: "pwvagcbojodcehlz"
    },
    // tls: {
    //   rejectUnauthorized: false
    // }
  });
  
  var mailOptions = {
    from: 'kesterdaniel401@gmail.com',
    to: merchantEmail,
    subject: 'Sending Email using Node.js',
    html: msgTxt
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