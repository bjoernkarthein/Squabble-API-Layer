module.exports = function (app, db) {
  app.get("/courses", function (req, res) {
    // Select all courses
    db.query("SELECT * FROM courses", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });

  // Select the course with the provided id
  app.get("/courses/:id", function (req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM courses WHERE id=?", id, (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });

  // Create a new course entry
  app.post("/courses", function (req, res) {
    const course = req.body.course;
    var values = [course.id, course.name];
    db.query(
      "INSERT INTO courses (id, name) VALUES (?)",
      [values],
      (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.json(course);
      }
    );
  });
};
