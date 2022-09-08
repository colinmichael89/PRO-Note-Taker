const fs = require("fs");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
const newNote = require.body;

// API GET Request
app.get("/api/notes", (req, res) => {
  console.info(`\nExecuting ${req.method} notes request`),
    res.sendFile(savedNotes);
});

// API POST Request
app.post("/api/notes", (req, res) => {
  console.log(
    `\nExecuting ${req.method} - New Note : ` + JSON.stringify(newNote)
  );
  // Create uuid
  newNote.id = uuidv4();
  // Save note
  savedNotes.push(newNote);
  // Write note
  fs.writeFileSync("./db/db.json", JSON.stringify(newNote));
  console.info("\nNew note successfully added!");
  res.json(savedNotes);
});

// API DELETE request
app.delete("/api/notes/:id", (req, res) => {
  // Fetch requested note by id
  let noteId = req.params.id.toString();
  console.info(`\n${req.method} request for noteId: ${noteId}`);

  // Read data from 'db.json' file
  let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const newData = data.filter((note) => note.id.toString() !== noteId);

  // Write new data to 'db.json' file
  fs.writeFileSync("./db/db.json", JSON.stringify(newData));

  console.info(`\nSuccessfully deleted note with id : ${noteId}`);

  // Send response
  res.json(newData);
});

// Export File
module.exports = app;
