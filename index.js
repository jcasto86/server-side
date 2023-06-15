// Import necessary modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
routes = require("./controllers/job-position.controller");

// Create an instance of the Express application
const app = express();
app.use(cors());
app.use(bodyParser.json());

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database with id:", db.threadId);
});

// API endpoint for fetching data USERS
app.get("/api/users", (req, res) => {
  // Perform a MySQL query to fetch data from the database
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

// Define an API endpoint for creating new data
app.post("/api/users", (req, res) => {
  // Extract the data from the request body
  const { username, email, password } = req.body;

  // Perform a MySQL query to insert the data into the database
  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (err, result) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      console.log(res);
      res.json({ message: "Data inserted successfully" });
    }
  );
});

/**
 *    ******* JOB POSITIONS  *********
 */

// API endpoint for fetching data JOB_POSITIONS
app.get("/api/job-positions", (req, res) => {
  // Perform a MySQL query to fetch data from the database
  db.query("SELECT * FROM job_positions", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

// Endpoint to handle the POST request
app.post("/api/job-positions", (req, res, next) => {
  const data = req.body; // Assuming you have the necessary body-parser middleware to parse JSON
  const sql =
    "INSERT INTO job_positions (id, logoHref, logoSrc, logoAltText, position, startMonth,startYear, endMonth, endYear, city, description, remote) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    data.id,
    data.logoHref,
    data.logoSrc,
    data.logoAltText,
    data.position,
    data.startMonth,
    data.startYear,
    data.endMonth,
    data.endYear,
    data.city,
    data.description,
    data.remote,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into MySQL:", err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      console.log("Data inserted into MySQL:", result);
      res.status(200).json({ message: "Data inserted successfully" });
    }
  });
});

// Endpoint to handle the DELETE request
app.delete("/api/job-positions/:id", (req, res, next) => {
  const jobPositionId = req.params.id; // Assuming you have the necessary body-parser middleware to parse JSON

  // Delete jobPosition from MySQL
  const sql = `DELETE FROM job_positions WHERE id = ?`;
  db.query(sql, [jobPositionId], (err, result) => {
    if (err) {
      console.error("Error deleting Job Position from MySQL:", err);
      res
        .status(500)
        .send("An error occurred while deleting the Job Position.");
      return;
    }

    res.status(200).send("jobPosition deleted successfully!");
  });
});

// EDIT JOB POSITION endpoint

app.put("/api/job-positions/:id", (req, res) => {
  const id = req.params.id;
  const {
    logoHref,
    logoSrc,
    logoAltText,
    position,
    startMonth,
    startYear,
    endMonth,
    endYear,
    city,
    description,
    remote,
  } = req.body;

  const query = `UPDATE job_positions SET logoHref = ?, logoSrc = ?, logoAltText = ?, position = ?, startMonth = ?, startYear = ?, endMonth = ?, endYear = ?, city = ?, description = ?, remote = ? WHERE id = ?`;
  db.query(
    query,
    [
      logoHref,
      logoSrc,
      logoAltText,
      position,
      startMonth,
      startYear,
      endMonth,
      endYear,
      city,
      description,
      remote,
      id,
    ],
    (error, results) => {
      if (error) {
        console.error("An error occurred while updating the row:", error);
        res.status(500).json({ error: "Failed to update the row" });
      } else {
        res.sendStatus(200);
      }
    }
  );
});

/**
 *    ******* EDUCATION *********
 */

// API endpoint for fetching data educations
app.get("/api/education", (req, res) => {
  // Perform a MySQL query to fetch data from the database
  db.query("SELECT * FROM educations", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

// Endpoint to handle the POST request
app.post("/api/education", (req, res, next) => {
  const data = req.body;
  const sql =
    "INSERT INTO educations (id, logoHref, logoSrc, logoAltText, studyName, university, startMonth,startYear, endMonth, endYear, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    data.id,
    data.logoHref,
    data.logoSrc,
    data.logoAltText,
    data.studyName,
    data.university,
    data.startMonth,
    data.startYear,
    data.endMonth,
    data.endYear,
    data.city,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into MySQL:", err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      console.log("Data inserted into MySQL:", result);
      res.status(200).json({ message: "Data inserted successfully" });
    }
  });
});

// Endpoint to handle the DELETE request
app.delete("/api/education/:id", (req, res, next) => {
  const educationId = req.params.id;

  // Delete Education from MySQL
  const sql = `DELETE FROM educations WHERE id = ?`;
  db.query(sql, [educationId], (err, result) => {
    if (err) {
      console.error("Error deleting Education from MySQL:", err);
      res.status(500).send("An error occurred while deleting the Education.");
      return;
    }

    res.status(200).send("Education deleted successfully!");
  });
});

// EDIT Education endpoint

app.put("/api/education/:id", (req, res) => {
  const id = req.params.id;
  const {
    logoHref,
    logoSrc,
    logoAltText,
    studyName,
    university,
    startMonth,
    startYear,
    endMonth,
    endYear,
    city,
  } = req.body;

  const query = `UPDATE educations SET logoHref = ?, logoSrc = ?, logoAltText = ?, studyName = ?, university = ?, startMonth = ?, startYear = ?, endMonth = ?, endYear = ?, city = ? WHERE id = ?`;
  db.query(
    query,
    [
      logoHref,
      logoSrc,
      logoAltText,
      studyName,
      university,
      startMonth,
      startYear,
      endMonth,
      endYear,
      city,
      id,
    ],
    (error, results) => {
      if (error) {
        console.error("An error occurred while updating the row:", error);
        res.status(500).json({ error: "Failed to update the row" });
      } else {
        res.sendStatus(200);
      }
    }
  );
});

/**
 *    ******* SKILLS  *********
 */

// API endpoint for fetching data JOB_POSITIONS
app.get("/api/skills", (req, res) => {
  // Perform a MySQL query to fetch data from the database
  db.query("SELECT * FROM skills", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.post("/api/skills", (req, res, next) => {
  const data = req.body;
  const sql =
    "INSERT INTO skills (id, title, src, certificate) VALUES (?, ?, ?, ?)";
  const values = [data.id, data.title, data.src, data.certificate];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into MySQL:", err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      console.log("Data inserted into MySQL:", result);
      res.status(200).json({ message: "Data inserted successfully" });
    }
  });
});

app.delete("/api/skills/:id", (req, res, next) => {
  const skillId = req.params.id;

  // Delete skill from MySQL
  const sql = `DELETE FROM skills WHERE id = ?`;
  db.query(sql, [skillId], (err, result) => {
    if (err) {
      console.error("Error deleting Skill from MySQL:", err);
      res.status(500).send("An error occurred while deleting the Skill.");
      return;
    }

    res.status(200).send("skill deleted successfully!");
  });
});

// ********** LOG TABLE **********

app.get("/log", (req, res) => {
  // Perform a MySQL query to fetch data from the database
  db.query("SELECT * FROM log", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

// app.put("/api/log/:id/authorized", (req, res) => {
//   const logEntryId = req.params.id;
//   const updatedValue = req.body.authorized;

//   // Update the "authorized" value in the database for the specified log entry ID
//   // Your code here...

//   res.sendStatus(200); // Send a success response
// });

app.put("/log/:id", (req, res) => {
  const id = req.params.id;
  const { authorized } = req.body;

  const query = `UPDATE log SET authorized = ? WHERE id = ?`;
  db.query(query, [authorized, id], (error, results) => {
    if (error) {
      console.error("An error occurred while updating the row:", error);
      res.status(500).json({ error: "Failed to update the row" });
    } else {
      console.error("Log edited");
      res.sendStatus(200);
    }
  });
});

// Start the server and listen for incoming requests
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
