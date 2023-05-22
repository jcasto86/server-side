const express = require("express"),
  router = express.Router();

const db = require("../db");

//
router.get("/", (req, res) => {
  res.send("list of Job Positions.");
});

module.exports = router;
