const fs = require("fs");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const notes = require("../db/db.json");

const app = express();

// API GET Request
app.get("/api/notes", (req, res) => {
  console.info(`\nExecuting ${req.method} notes request`);
  // Read File
  let data = JSON.parse(fs.readFileSync(notes, "utf8"));
  res.json(data);
});

// API POST Request
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  console.log(`\nExecuting ${req.method} of New Note`);
  // Create uuid
  newNote.id = uuidv4();
  // Read file
  let data = JSON.parse(fs.readFileSync(notes, "utf8"));
  data.push(newNote);
  // Write note
  fs.writeFileSync("../db/db.json", JSON.stringify(data));
  console.info("\nNew note successfully added!");
  res.json(data);
});
// API DELETE request
app.delete("/api/notes/:id", (req, res) => {
  // Fetch requested note by id
  let noteId = req.params.id.toString();
  console.info(`\n${req.method} request for noteId: ${noteId}`);
  // Read file
  let data = JSON.parse(fs.readFileSync(notes, "utf8"));
  const newData = data.filter((note) => note.id.toString() !== noteId);

  // Write to file
  fs.writeFileSync("../db/db.json", JSON.stringify(newData));

  console.info(`\nSuccessfully deleted note with id : ${noteId}`);

  // Send response
  res.json(newData);
});

// Export File
module.exports = app;
