module.exports = function (app, db) {
  app.get("/single_player_attempts", function (req, res) {
    db.query("SELECT * FROM single_player_attempts", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });

  app.get("/single_player_attempts/:aid", function (req, res) {
    const id = req.params.aid;
    db.query(
      "SELECT * FROM single_player_attempts WHERE attemptid=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  app.get("/single_player_attempts/user/:uid", function (req, res) {
    const id = req.params.uid;
    db.query(
      "SELECT * FROM single_player_attempts WHERE userid=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  app.get("/single_player_attempts/quiz/:qid", function (req, res) {
    const id = req.params.qid;
    db.query(
      "SELECT * FROM single_player_attempts WHERE quizid=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  app.post("/single_player_attempts", function (req, res) {
    console.log(req.body);
    const data = req.body.spa;
    var values = [
      data.attemptId,
      data.userId,
      data.usename,
      data.quizId,
      data.quizname,
      data.totalPoints,
      data.grade,
      data.startDate,
      data.endDate,
    ];

    db.query(
      "INSERT INTO single_player_attempts (attemptid, userid, username, quizid, quizname, totalpoints, grade, startdate, enddate) VALUES (?)",
      [values],
      (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.json(data);
      }
    );
  });
};
