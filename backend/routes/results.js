import express from "express";
import db from "../db.js";

const router = express.Router();

// 🧾 Route 1: Insert marks for a student
router.post("/insert", (req, res) => {
  const { prn, name, marks } = req.body;

  if (!prn || !name || !marks) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Insert student if not already present
  db.query(
    "INSERT IGNORE INTO student (prn, name) VALUES (?, ?)",
    [prn, name],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Insert marks for each subject
      const queries = marks.map((m) => [
        prn,
        m.course_id,
        m.mse_marks,
        m.ese_marks,
      ]);

      db.query(
        "INSERT INTO marks (prn, course_id, mse_marks, ese_marks) VALUES ?",
        [queries],
        (err2) => {
          if (err2) return res.status(500).json({ error: err2.message });
          res.json({ message: "Marks inserted successfully" });
        }
      );
    }
  );
});

// 🧮 Route 2: Get result by PRN
router.get("/results/:prn", (req, res) => {
  const prn = req.params.prn;

  const sql = `
    SELECT s.name, c.name AS course_name, m.mse_marks, m.ese_marks,
           (m.mse_marks + m.ese_marks) AS total,
           CASE
             WHEN (m.mse_marks + m.ese_marks) >= 91 THEN 'A+'
             WHEN (m.mse_marks + m.ese_marks) >= 81 THEN 'A'
             WHEN (m.mse_marks + m.ese_marks) >= 71 THEN 'B+'
             WHEN (m.mse_marks + m.ese_marks) >= 61 THEN 'B'
             WHEN (m.mse_marks + m.ese_marks) >= 51 THEN 'C'
             WHEN (m.mse_marks + m.ese_marks) >= 41 THEN 'D'
             ELSE 'F'
           END AS grade
    FROM marks m
    JOIN student s ON m.prn = s.prn
    JOIN course c ON m.course_id = c.id
    WHERE m.prn = ?
  `;

  db.query(sql, [prn], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "No records found" });
    res.json(results);
  });
});

export default router;
