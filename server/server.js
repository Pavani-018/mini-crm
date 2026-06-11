require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Connection Failed");
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

app.get("/", (req, res) => {
  res.send("Mini CRM Backend Running 🚀");
});

app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});

// Get all leads
app.get("/leads", (req, res) => {
  db.query("SELECT * FROM leads", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Failed to fetch leads",
      });
    }

    res.json(results);
  });
});

// Add a lead
app.post("/leads", (req, res) => {
  const { name, email, phone, message } = req.body;

  db.query(
    "INSERT INTO leads (name,email,phone,message) VALUES (?,?,?,?)",
    [name, email, phone, message],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Failed to add lead",
        });
      }

      res.json({
        message: "Lead added successfully",
      });
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.delete("/leads/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM leads WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to delete lead" });
    }

    res.json({ message: "Lead deleted successfully" });
  });
});
app.put("/leads/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, phone, message } = req.body;

  db.query(
    "UPDATE leads SET name=?, email=?, phone=?, message=? WHERE id=?",
    [name, email, phone, message, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to update lead" });
      }

      res.json({ message: "Lead updated successfully" });
    }
  );
});