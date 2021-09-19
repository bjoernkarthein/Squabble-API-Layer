module.exports = function (app, db) {
  // Select all user to course mappings
  app.get("/user_courses", function (req, res) {
    db.query("SELECT * FROM user_courses", (err, rows) => {
      if (err) throw err;

      console.log("Data received from Db:");
      console.log(rows);
      res.json(rows);
    });
  });

  // Select all user to course mappings for the defined user
  app.get("/user_courses/user/:uid", function (req, res) {
    const user_id = req.params.uid;
    db.query(
      "SELECT * FROM user_courses WHERE userId=?",
      user_id,
      (err, rows) => {
        if (err) throw err;
        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  // Select all user to course mappings for the defined course
  app.get("/user_courses/course/:cid", function (req, res) {
    const course_id = req.params.cid;
    db.query(
      "SELECT * FROM user_courses WHERE courseId=?",
      course_id,
      (err, rows) => {
        if (err) throw err;
        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  // Select the specific user to course mapping for the defined user and course
  app.get("/user_courses/user/:uid/course/:cid", function (req, res) {
    const course_id = req.params.cid;
    const user_id = req.params.uid;
    db.query(
      "SELECT * FROM user_courses WHERE courseId=? AND userId=?",
      [course_id, user_id],
      (err, rows) => {
        if (err) throw err;
        console.log("Data received from Db:");
        console.log(rows);
        res.json(rows);
      }
    );
  });

  // Create a new user to course mapping
  app.post("/user_courses", function (req, res) {
    var values = [req.body.userId, req.body.courseId];
    db.query(
      "INSERT INTO user_courses (userId, courseId) VALUES (?)",
      [values],
      (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.json(result);
      }
    );
  });
};
