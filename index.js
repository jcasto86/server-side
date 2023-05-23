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
    "INSERT INTO job_positions (id, logoHref, logoSrc, logoAltText, position, startDate, endDate, city, description, remote) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    data.id,
    data.logoHref,
    data.logoSrc,
    data.logoAltText,
    data.position,
    data.startDate,
    data.endDate,
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

// // DELETE endpoint
// app.delete("/job-positions/(:id)", (req, res) => {
//   const jobPositionId = req.params.id;

//   // Delete jobPosition from MySQL
//   const sql = `DELETE FROM job_positions WHERE id = ?`;
//   db.query(sql, [jobPositionId], (err, result) => {
//     if (err) {
//       console.error("Error deleting jobPosition from MySQL:", err);
//       res.status(500).send("An error occurred while deleting the jobPosition.");
//       return;
//     }

//     res.status(200).send("jobPosition deleted successfully!");
//   });
// });

// app.delete();

// Define other API endpoints for updating, deleting, etc.

// Start the server and listen for incoming requests
const port = 3000; // or any other port number you prefer
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
