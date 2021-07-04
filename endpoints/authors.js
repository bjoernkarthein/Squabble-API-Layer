module.exports = function (app, db) {
  app.get("/authors", function (req, res) {
    db.query("SELECT * FROM authors", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });
};
