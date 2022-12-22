const express = require("express");
const path = require("path");
const fs = require("fs");
const {v4: uuidv4} = require('uuid');

const PORT = process.env.PORT || 3002;

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

app.post("/api/notes", (req, res) => {
    console.log(req.body);
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);
        console.log(parsedNotes);
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr ? console.error(writeErr) : console.info("Success")
        );
      }
    });
    res.json(response);
  } else {
    res.json("Error in posting notes");
  }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  
  app.listen(PORT, () => {
    console.log(`NoteTaker listening to  port 3002`);
  });