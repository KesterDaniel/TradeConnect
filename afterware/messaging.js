const nodemailer = require("nodemailer")

function message(merchantEmail, msgTxt){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kesterdaniel401@gmail',
          pass: 'jahseh123'
        }
      });
      
      var mailOptions = {
        from: 'kesterdaniel@gmail.com',
        to: merchantEmail,
        subject: 'Order received',
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