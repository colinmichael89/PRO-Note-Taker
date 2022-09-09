const express = require("express");
const api = require("./routes/api.js");

const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

// Get Route for homepage
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/public")));

// Get ROUTE for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// Listen
app.listen(PORT, () =>
  console.info(`App listening at http://localhost:${PORT} 🚀`)
);
