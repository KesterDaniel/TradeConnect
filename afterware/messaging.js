const nodemailer = require("nodemailer")


function message(subtext, merchantEmail, msgTxt){

  var transporter = nodemailer.createTransport({
    secure: true,
    port: 465,
    service: "gmail",
    auth: {
      user: 'tradeconnect59@gmail.com',
      pass: process.env.GMAILPASS
    },
  });
  
  var mailOptions = {
    from: 'tradeconnect59@gmail.com',
    to: merchantEmail,
    subject: subtext,
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