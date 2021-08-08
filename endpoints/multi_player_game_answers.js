module.exports = function (app, db) {
  app.get("/multi_player_game_answers", function (req, res) {
    db.query("SELECT * FROM multi_player_game_answers", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });

  app.get("/multi_player_game_answers/:gid", function (req, res) {
    const id = req.params.gid;
    db.query(
      "SELECT * FROM multi_player_game_answers WHERE gameId=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  app.get("/multi_player_game_answers/:gid/round/:rid", function (req, res) {
    const gid = req.params.gid;
    const rid = req.params.rid;
    db.query(
      "SELECT * FROM multi_player_game_answers WHERE gameId=? AND roundNumber=?;",
      [gid, rid],
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  app.post("/multi_player_game_answers", function (req, res) {
    console.log(req.body);
    const data = req.body.mpa;
    var values = [
      data.gameId,
      data.roundNumber,
      data.questionSlot,
      data.answerOption,
      data.answerValue,
    ];

    db.query(
      "INSERT INTO multi_player_game_answers (gameId, roundNumber, questionSlot, answerOption, answerValue) VALUES (?)",
      [values],
      (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.json(data);
      }
    );
  });
};
