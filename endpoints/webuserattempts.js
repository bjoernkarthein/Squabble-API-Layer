module.exports = function (app, db) {
  app.get("/webuserattempts", function (req, res) {
    db.query("SELECT * FROM webuserattempts", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });

  app.get("/webuserattempts/:id", function (req, res) {
    const id = req.params.id;
    db.query(
      "SELECT * FROM webuserattempts WHERE quizid=?",
      id,
      (err, rows) => {
        if (err) throw err;

        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  app.post("/webuserattempts", function (req, res) {
    const data = req.body;
    var values = [data.quizId, data.attemptId];
    db.query(
      "INSERT INTO webuserattempts (quizid, attemptid) VALUES (?)",
      [values],
      (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.json(data);
      }
    );
  });
};
