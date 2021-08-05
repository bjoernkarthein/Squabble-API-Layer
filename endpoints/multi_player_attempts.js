module.exports = function (app, db) {
  app.get("/multi_player_attempts", function (req, res) {
    db.query("SELECT * FROM multi_player_attempts", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });

  app.get("/multi_player_attempts/:gid", function (req, res) {
    const id = req.params.gid;
    db.query(
      "SELECT * FROM multi_player_attempts INNER JOIN users ON multi_player_attempts.opponentId=users.id WHERE gid=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  app.get("/multi_player_attempts/user/:uid", function (req, res) {
    const id = req.params.uid;
    db.query(
      "SELECT * FROM multi_player_attempts WHERE initiatorId=? OR opponentId=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  app.get("/multi_player_attempts/course/:cid", function (req, res) {
    const id = req.params.cid;
    db.query(
      "SELECT * FROM multi_player_attempts WHERE courseId=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  app.get("/multi_player_attempts/course/:cid/user/:uid", function (req, res) {
    const cid = req.params.cid;
    const uid = req.params.uid;
    db.query(
      "SELECT * FROM multi_player_attempts WHERE courseId=? AND (initiatorId=? OR opponentId=?);",
      [cid, uid, uid],
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  app.post("/multi_player_attempts", function (req, res) {
    console.log(req.body);
    const data = req.body.mpa;
    var values = [
      data.initiatorId,
      data.opponentId,
      data.courseId,
      data.inProgress,
      data.currentRound,
      data.nextTurnId,
      data.questionsAreSet,
      data.turns,
    ];

    db.query(
      "INSERT INTO multi_player_attempts (initiatorId, opponentId, courseId, inProgress, currentRound, nextTurnId, questionsAreSet, turns) VALUES (?)",
      [values],
      (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.json(data);
      }
    );
  });

  app.put("/multi_player_attempts", function (req, res) {
    console.log(req.body);
    const data = req.body.mpa;
    const values = [
      data.initiatorId,
      data.opponentId,
      data.courseId,
      data.inprogress,
      data.currentRound,
      data.nextTurnId,
      data.questionsAreSet,
      data.turns,
      data.gameId,
    ];

    db.query(
      "UPDATE multi_player_attempts SET initiatorId = ?, opponentId = ?, courseId = ?, inProgress = ?, currentRound = ?, nextTurnId = ?, questionsAreSet = ?, turns = ? WHERE gid = ?",
      values,
      (err, result) => {
        if (err) throw err;
        console.log("Number of records changed: " + result.affectedRows);
        res.json(data);
      }
    );
  });
};
