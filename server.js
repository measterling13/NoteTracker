const express = require("express");
const path = require("path");
const fs = require("fs");
const {v4: uuidv4} = require('uuid');

const PORT = 3002;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get("/api/notes", (req, res) => {
  fs.readFile('./db/db.json', "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({message: "Error getting notes."})
    }
    res.send(data);
  });
});
