module.exports = function (app, db) {
  app.get("/multi_player_statistics", function (req, res) {
    db.query("SELECT * FROM multi_player_statistics", (err, rows) => {
      if (err) throw err;

      console.log("Data received from db (statistics):");
      console.log(rows);
      res.json(rows);
    });
  });

  app.get(
    "/multi_player_statistics/user/:uid/course/:cid",
    function (req, res) {
      const uid = req.params.uid;
      const cid = req.params.cid;
      db.query(
        "SELECT * FROM multi_player_statistics WHERE userId=? AND courseId=?",
        [uid, cid],
        (err, rows) => {
          if (err) throw err;

          console.log("Data received from db (statistics):");
          console.log(rows);
          res.json(rows);
        }
      );
    }
  );

  app.get("/multi_player_statistics/course/:cid", function (req, res) {
    const id = req.params.cid;
    db.query(
      "SELECT totalWins, totalLosses, totalRight, totalWrong, username, firstname, lastname FROM multi_player_statistics INNER JOIN users ON multi_player_statistics.userId = users.id WHERE multi_player_statistics.courseId=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from db (statistics):");
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
      data.courseId,
      data.totalWins,
      data.totalLosses,
      data.totalRight,
      data.totalWrong,
    ];

    db.query(
      "INSERT INTO multi_player_statistics (userId, courseId, totalWins, totalLosses, totalRight, totalWrong) VALUES (?)",
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
      data.courseId,
    ];

    db.query(
      "UPDATE multi_player_statistics SET totalWins = ?, totalLosses = ?, totalRight = ?, totalWrong = ? WHERE userId = ? AND courseId = ?",
      values,
      (err, result) => {
        if (err) throw err;
        console.log("Number of records changed: " + result.affectedRows);
        console.log("statistics updated successfully");
        res.json(data);
      }
    );
  });
};
