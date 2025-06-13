const mysql = require("mysql2/promise");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "excuses_de_dev",
});

app.get("/api/excuses", async (req, res) => {
  try {
    const [excuses] = await pool.query(
      "SELECT e.id, e.http_code, t.name AS tag, e.message FROM excuses e JOIN tags t ON e.tag_id = t.id"
    );
    res.json(excuses);
  } catch (error) {
    console.error("Erreur dans GET /api/excuses:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get("/api/tags", async (req, res) => {
  try {
    const [tags] = await pool.query("SELECT * FROM tags");
    res.json(tags);
  } catch (error) {
    console.error("Erreur dans GET /api/tags:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post("/api/excuses", async (req, res) => {
  const { tag_id, message } = req.body;
  if (!tag_id || !message) {
    return res.status(400).json({ error: "Tag et message sont requis" });
  }
  try {
    const [tagExists] = await pool.query("SELECT id FROM tags WHERE id = ?", [
      tag_id,
    ]);
    if (tagExists.length === 0) {
      return res.status(400).json({ error: "Tag invalide" });
    }

    // Récupérer tous les codes HTTP utilisés
    const [usedCodes] = await pool.query(
      "SELECT http_code FROM excuses WHERE http_code >= 700 ORDER BY http_code ASC"
    );
    let nextHttpCode = 700;

    if (usedCodes.length > 0) {
      const usedCodesArray = usedCodes.map((row) => row.http_code);
      // Trouver le premier code disponible à partir de 700
      for (let i = 700; ; i++) {
        if (!usedCodesArray.includes(i)) {
          nextHttpCode = i;
          break;
        }
      }
    }

    const [result] = await pool.query(
      "INSERT INTO excuses (http_code, tag_id, message) VALUES (?, ?, ?)",
      [nextHttpCode, tag_id, message]
    );
    const [newExcuse] = await pool.query(
      "SELECT e.id, e.http_code, t.name AS tag, e.message FROM excuses e JOIN tags t ON e.tag_id = t.id WHERE e.id = ?",
      [result.insertId]
    );
    res.status(201).json(newExcuse[0]);
  } catch (error) {
    console.error("Erreur dans POST /api/excuses:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(3001, () => console.log("Serveur sur port 3001"));
