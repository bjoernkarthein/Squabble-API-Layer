module.exports = function (app, db) {
  app.get("/multi_player_game_questions", function (req, res) {
    db.query("SELECT * FROM multi_player_game_questions", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });

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

  app.post("/multi_player_game_questions", function (req, res) {
    console.log(req.body);
    const data = req.body.mpq;
    var values = [
      data.gameId,
      data.attemptId,
      data.roundNumber,
      JSON.stringify(data.question),
      data.givenAnswers,
      data.rightAnswers,
    ];

    db.query(
      "INSERT INTO multi_player_game_questions (gameId, attemptId, roundNumber, question, givenAnswers, rightAnswers) VALUES (?)",
      [values],
      (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.json(data);
      }
    );
  });
};
