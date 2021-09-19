var express = require("express");
var app = express();
const PORT = process.env.PORT || 5000;
var mysql = require("mysql");
var config = require("./config");
var bodyParser = require("body-parser");

var db = mysql.createConnection(config.databaseCredentials);

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database " + config.databaseCredentials.database);
});

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:8100"],
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  db.query("SHOW TABLES", (err, rows) => {
    if (err) throw err;

    console.log("Data received from Db:");
    console.log(rows);
    res.json(rows);
  });
});

// Importing the different endpoints.
require("./endpoints/users")(app, db);
require("./endpoints/courses")(app, db);
require("./endpoints/user_courses")(app, db);
require("./endpoints/single_player_attempts")(app, db);
require("./endpoints/multi_player_attempts")(app, db);
require("./endpoints/multi_player_game_questions")(app, db);
require("./endpoints/multi_player_game_answers")(app, db);
require("./endpoints/multi_player_statistics")(app, db);
require("./endpoints/send_mail")(app, db);

app.listen(PORT, function () {
  console.log("Server is running..");
});
