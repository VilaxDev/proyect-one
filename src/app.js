import express from "express";
import { pool } from "./db.js";
import { PORT } from "./config.js";

const app = express();

app.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users");
  res.json(rows);
});

app.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT 'hello word' as result");
  res.json(result[0]);
});

app.get("/create", async (req, res) => {
  const result = await pool.query(
    "INSERT INTO users (username, email) VALUES ('testuser', 'testuser@example.com')"
  );
  res.json(result);
});

app.listen(PORT);
console.log("Server is running on port ", PORT);
