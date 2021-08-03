var express = require("express");
var app = express();
const PORT = 5000;
var mysql = require("mysql");
var config = require("./config");
var bodyParser = require("body-parser");

var db = mysql.createConnection(config.databaseCredentials);

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database quiz_game");
});

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

// Importing the different endpoints
require("./endpoints/users")(app, db);
require("./endpoints/single_player_attempts")(app, db);
require("./endpoints/multi_player_attempts")(app, db);
require("./endpoints/multi_player_game_questions")(app, db);

app.listen(PORT, function () {
  console.log("Server is running..");
});
