module.exports = function (app, db) {
  app.get("/multi_player_attempts", function (req, res) {
    // Select all multi-player games
    db.query("SELECT * FROM multi_player_attempts", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });

  // Select the multi-player attempt with the defined id
  app.get("/multi_player_attempts/:gid", function (req, res) {
    const id = req.params.gid;
    db.query(
      "SELECT * FROM multi_player_attempts INNER JOIN users ON multi_player_attempts.opponentId=users.id WHERE gid=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from db (multiplayer attempts):");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  // Select all multi-player games for the user with the given id
  app.get("/multi_player_attempts/user/:uid", function (req, res) {
    const id = req.params.uid;
    db.query(
      "SELECT * FROM multi_player_attempts WHERE initiatorId=? OR opponentId=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from db (multiplayer attempts):");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  // Select all multi-player games for one specific course
  app.get("/multi_player_attempts/course/:cid", function (req, res) {
    const id = req.params.cid;
    db.query(
      "SELECT * FROM multi_player_attempts WHERE courseId=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from db (multiplayer attempts):");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  // Select all multi-player games belonging to a specific user inside the defined course
  app.get("/multi_player_attempts/course/:cid/user/:uid", function (req, res) {
    const cid = req.params.cid;
    const uid = req.params.uid;
    db.query(
      "SELECT * FROM multi_player_attempts WHERE courseId=? AND (initiatorId=? OR opponentId=?);",
      [cid, uid, uid],
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from db (multiplayer attempts):");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  // Create a new multi-player game entry
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
      data.initiatorPoints,
      data.opponentPoints,
    ];

    db.query(
      "INSERT INTO multi_player_attempts (initiatorId, opponentId, courseId, inProgress, currentRound, nextTurnId, questionsAreSet, turns, initiatorPoints, opponentPoints) VALUES (?)",
      [values],
      (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        console.log("attempt created sucessfully");
        res.json(data);
      }
    );
  });

  // Alter an existing multi-player game
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
      data.initiatorPoints,
      data.opponentPoints,
      data.gameId,
    ];

    db.query(
      "UPDATE multi_player_attempts SET initiatorId = ?, opponentId = ?, courseId = ?, inProgress = ?, currentRound = ?, nextTurnId = ?, questionsAreSet = ?, turns = ?, initiatorPoints = ?, opponentPoints = ? WHERE gid = ?",
      values,
      (err, result) => {
        if (err) throw err;
        console.log("Number of records changed: " + result.affectedRows);
        res.json(data);
      }
    );
  });

  // Delete an existing multi-player game and all associated multi-player questions and answers
  app.delete("/multi_player_attempts/:gid", function (req, res) {
    const id = req.params.gid;
    console.log("deleting " + id);
    db.query(
      "DELETE FROM multi_player_attempts WHERE gid = ?",
      id,
      (err, rows) => {
        if (err) throw err;
        console.log("Records deleted (multiplayer attempts)");
      }
    );

    db.query(
      "DELETE FROM multi_player_game_questions WHERE gameId = ?",
      id,
      (err, rows) => {
        if (err) throw err;
        console.log("Records deleted (multiplayer attempts)");
      }
    );

    db.query(
      "DELETE FROM multi_player_game_questions WHERE gameId = ?",
      id,
      (err, rows) => {
        if (err) throw err;
        console.log("Records deleted (multiplayer attempts):");
        console.log(id);
        res.json(id);
      }
    );
  });
};
