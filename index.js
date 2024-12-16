const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "unubold",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
    return;
  }
  console.log("Connected to MySQL database");
});

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/user", (req, res) => {
  const sqlQuery = "SELECT * FROM user";
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("aldaa garlaa");
    } else {
      res.json(results);
    }
  });
});

app.post("/create", (req, res) => {
  const { name, email, password } = req.body;
  const sqlQuery =
    "INSERT INTO user (name, email, password, created_at) VALUES (?, ?, ?, current_timestamp)";
  db.query(sqlQuery, [name, email, password], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("aldaa garlaa");
    } else {
      console.log("Amjilttai");
      res.redirect("/");
    }
  });
});

app.get("/orders", (req, res) => {
  const sqlQuery = "SELECT * FROM orders";
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("aldaa garlaa");
    } else {
      res.json(results);
    }
  });
});

app.post("/createOrder", (req, res) => {
  const { name, description, address } = req.body;

  const sqlQuery =
    "INSERT INTO orders (name, description, address, created_at) VALUES (?, ?, ?, current_timestamp)";
  db.query(sqlQuery, [name, description, address], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("aldaa garlaa");
    } else {
      console.log("Amjilttai");
      res.redirect("/");
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server ajillaj bn http://localhost:${port}`);
});
