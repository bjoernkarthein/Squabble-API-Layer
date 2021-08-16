module.exports = function (app, db) {
  app.get("/multi_player_statistics", function (req, res) {
    db.query("SELECT * FROM multi_player_statistics", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });

  app.get("/multi_player_statistics/user/:uid", function (req, res) {
    const id = req.params.uid;
    db.query(
      "SELECT * FROM multi_player_statistics WHERE userId=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  app.get("/multi_player_statistics/course/:cid", function (req, res) {
    const id = req.params.cid;
    db.query(
      "SELECT totalWins, totalLosses, totalRight, totalWrong, username, firstname, lastname FROM user_courses INNER JOIN multi_player_statistics ON user_courses.userId = multi_player_statistics.userId INNER JOIN users ON multi_player_statistics.userId = users.id WHERE courseId=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  app.post("/multi_player_statistics", function (req, res) {
    console.log(req.body);
    const data = req.body.statistic;
    var values = [
      data.userId,
      data.totalWins,
      data.totalLosses,
      data.totalRight,
      data.totalWrong,
    ];

    db.query(
      "INSERT INTO multi_player_statistics (userId, totalWins, totalLosses, totalRight, totalWrong) VALUES (?)",
      [values],
      (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.json(data);
      }
    );
  });

  app.put("/multi_player_statistics", function (req, res) {
    console.log(req.body);
    const data = req.body.statistic;
    const values = [
      data.totalWins,
      data.totalLosses,
      data.totalRight,
      data.totalWrong,
      data.userId,
    ];

    db.query(
      "UPDATE multi_player_statistics SET totalWins = ?, totalLosses = ?, totalRight = ?, totalWrong = ? WHERE userId = ?",
      values,
      (err, result) => {
        if (err) throw err;
        console.log("Number of records changed: " + result.affectedRows);
        res.json(data);
      }
    );
  });
};
