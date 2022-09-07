const express = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const db = require("../db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
