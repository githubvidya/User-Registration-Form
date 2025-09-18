import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors()); 
app.use(express.json()); 

// conection
const db = mysql.createConnection({
  host: "127.0.0.1",   
  port: 3306,
  user: "root",
  password: "1234",
  database: "mydbb"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

app.post("/api/users", (req, res) => {
  console.log("📩 Incoming data:", req.body);

  const { firstname, lastname, city, village, gender } = req.body;
  const sql =
    "INSERT INTO userss (firstname, lastname, city, village, gender) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [firstname, lastname, city, village, gender], (err, result) => {
    if (err) {
      console.error("❌ Insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("✅ Row inserted with ID:", result.insertId);
    res.status(201).json({ message: "User added", id: result.insertId });
  });
});


app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
