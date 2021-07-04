var express = require("express");
var app = express();
const PORT = 5000;
var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootPass1298",
  port: 3306,
  database: "quiz_game",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database quiz_game");
});

app.get("/", function (req, res) {
  db.query("SHOW TABLES", (err, rows) => {
    if (err) throw err;

    console.log("Data received from Db:");
    console.log(rows);
    res.json(rows);
  });
});

// Importing the different endpoints
require("./endpoints/authors")(app, db);

app.listen(PORT, function () {
  console.log("Server is running..");
});

exports.database = db;
exports.app = app;
