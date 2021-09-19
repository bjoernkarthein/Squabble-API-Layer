module.exports = function (app, db) {
  app.get("/multi_player_game_questions", function (req, res) {
    // Select all multi-player questions
    db.query("SELECT * FROM multi_player_game_questions", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });

  // Select all multi-player questions for the specific game
  app.get("/multi_player_game_questions/:gid", function (req, res) {
    const id = req.params.gid;
    db.query(
      "SELECT * FROM multi_player_game_questions WHERE gameId=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  // Select all questions for the provided game and round
  app.get("/multi_player_game_questions/:gid/round/:rid", function (req, res) {
    const gid = req.params.gid;
    const rid = req.params.rid;
    db.query(
      "SELECT * FROM multi_player_game_questions WHERE gameId=? AND roundNumber=?;",
      [gid, rid],
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  // Select all questions for the given game and round together with the right answer for every question
  app.get(
    "/multi_player_game_questions/:gid/round/:rid/attempt/:aid/withanswers",
    function (req, res) {
      const gid = req.params.gid;
      const rid = req.params.rid;
      const aid = req.params.aid;
      db.query(
        "SELECT * FROM multi_player_game_questions INNER JOIN multi_player_game_answers ON multi_player_game_questions.slot = multi_player_game_answers.slot WHERE gameId=? AND roundNumber=? AND attemptId=?;",
        [gid, rid, aid],
        (err, rows) => {
          if (err) throw err;

          console.log("Data received from Db:");
          console.log(rows);
          res.json(rows);
        }
      );
    }
  );

  // Create a new multi-player question
  app.post("/multi_player_game_questions", function (req, res) {
    console.log(req.body);
    const data = req.body.mpq;
    var values = [
      data.gameId,
      data.attemptId,
      data.roundNumber,
      data.questionSlot,
      JSON.stringify(data.question),
      data.rightAnswers,
    ];

    db.query(
      "INSERT INTO multi_player_game_questions (gameId, attemptId, roundNumber, questionSlot, question, rightAnswers) VALUES (?)",
      [values],
      (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.json(data);
      }
    );
  });

  // Update an existing multi-player question
  app.put("/multi_player_game_questions", function (req, res) {
    console.log(req.body);
    const data = req.body.mpq;
    const values = [
      data.playerOneRight,
      data.playerTwoRight,
      data.gameId,
      data.questionSlot,
      data.roundNumber,
    ];

    db.query(
      "UPDATE multi_player_game_questions SET playerOneRight = ?, playerTwoRight = ? WHERE gameId = ? AND questionSlot = ? AND roundNumber = ?",
      values,
      (err, result) => {
        if (err) throw err;
        console.log("Number of records changed: " + result.affectedRows);
        res.json(data);
      }
    );
  });
};
