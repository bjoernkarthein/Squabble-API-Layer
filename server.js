var express = require("express");
var app = express();
const PORT = 5000;
var mysql = require("mysql");
var config = require("./config");
var bodyParser = require("body-parser");

// establishes a database connection with the credentials provided in 'config.js'
var db = mysql.createConnection(config.databaseCredentials);

// connects to the database
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database " + config.databaseCredentials.database);
});

// disable CORS rule, only needed for local development
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:8100"],
  })
);

// enable json data for requests to be parsed
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// accessing the index logs a list of all database tables
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

// serving the app on the specified port
app.listen(PORT, function () {
  console.log("Server is running..");
});
