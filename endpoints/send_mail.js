var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bjoern.karthein@gmail.com",
    pass: "hsxephcbiftghgkh",
  },
});

var mailOptions = {
  from: "noreply@competitive-quiz.com",
  subject: "Competitive Quiz Invitation",
};

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
      "http://localhost:8100";

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
};
