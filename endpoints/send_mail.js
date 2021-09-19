var nodemailer = require("nodemailer");

// Mail server credentials
var transporter = nodemailer.createTransport({
  service: "<YOUR_MAIL_SERVICE>",
  auth: {
    user: "<DEDICATED_MAIL_ADDRESS>",
    pass: "<DEDICATED_APPLICATION_SPECIFIC_PASSWORD>",
  },
});

// Defining subject and sender of mail address
var mailOptions = {
  from: "noreply@squabble.com",
  subject: "Squabble Invitation - Play against your friends!",
};

// Sends an email to the user in the name of the inviter
module.exports = function (app, db) {
  app.post("/send_mail", function (req, res) {
    const inviter = req.body.inviter;
    const user = req.body.user;
    mailOptions.to = user.email;
    mailOptions.text =
      inviter.firstname +
      " " +
      inviter.lastname +
      " invited you to play some games.\n" +
      "launch the app to play.\n" +
      "<APPLICATION_URL>";

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
};
