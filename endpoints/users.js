module.exports = function (app, db) {
  app.get("/users", function (req, res) {
    db.query("SELECT * FROM users", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });

  app.get("/users/:id", function (req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM users WHERE id=?", id, (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });

  app.get("/users/random/:id", function (req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM users WHERE NOT id=?", id, (err, rows) => {
      if (err) throw err;
      console.log("Data received from Db:");
      console.log(rows);
      if (rows.length <= 0) {
        res.err("no other users found");
      } else {
        const index = Math.floor(Math.random() * rows.length);
        res.json(rows[index]);
      }
    });
  });

  app.post("/users", function (req, res) {
    console.log(req.body.user);
    const user = req.body.user;
    var values = [
      user.id,
      user.email,
      user.firstname,
      user.lastname,
      user.username,
      user.token,
    ];
    db.query(
      "INSERT INTO users (id, email, firstname, lastname, username, token) VALUES (?)",
      [values],
      (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.json(user);
      }
    );
  });
};
