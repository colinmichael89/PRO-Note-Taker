const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const uuid = require("uuid");

const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static files
app.use(express.static("public"));

// Get Route for homepage
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public")));

// Get Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// Get Route for saved notes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

// Post new note
app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("db/db.json"));
  const newNote = req.body;
  console.info(`\nExecuting ${req.method} of New Note`);
  // Create uuid
  newNote.id = uuid.v4();

  notes.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  console.info("\nNew note successfully added!");
  res.json(notes);
});

// Delete note by ID
app.delete("/api/notes/:id", (req, res) => {
  let noteId = req.params.id;
  const notes = JSON.parse(fs.readFileSync("db/db.json"));
  const deleteNoteEl = notes.filter(
    (removeNote) => removeNote.id !== req.params.id
  );
  fs.writeFileSync("db/db.json", JSON.stringify(deleteNoteEl));
  console.info(`\nSuccessfully deleted note with id : ${req.params.id}`);
  res.json(deleteNoteEl);
});

// Listen
app.listen(PORT, () =>
  console.info(`App listening at http://localhost:${PORT} 🚀`)
);
