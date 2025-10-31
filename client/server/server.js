const express = require('express');
const fs = require('fs');
const path = require('path');



const app = express();
const cors = require('cors');
app.use(cors());
const port = 3001;

// Enable JSON body parsing
app.use(express.json());
/*
app.post('/affirmationStore', (req, res) => {
    
let preRecived = req.body

let newArray = []
for (let i = 0; i < preRecived.length; i++) {
    newArray[i] = {affirmationNumer: i,  affiramtion: preRecived[i].affiramtion}
}
  //const received = req.body; // Expecting an array of JSON objects
    const received = newArray
  if (!Array.isArray(received)) {
    return res.status(400).send('Expected an array in request body');
  }

  // Directory and file setup
  const affirmationsDir = path.join(__dirname, 'affirmations');
  const affirmationsFile = path.join(affirmationsDir, 'affirmations.txt');

  // Ensure folder exists
  if (!fs.existsSync(affirmationsDir)) {
    fs.mkdirSync(affirmationsDir, { recursive: true });
  }

  // Convert array items to strings
  const dataToWrite = received.map(item => JSON.stringify(item)).join('\n') + '\n';

  // Write or append file
  fs.appendFileSync(affirmationsFile, dataToWrite, 'utf8');

  res.send('Affirmations saved successfully!');
});*/
app.post('/affirmationStore', (req, res) => {
  const preReceived = req.body;

  if (!Array.isArray(preReceived)) {
    return res.status(400).send('Expected an array in request body');
  }

  // Build a normalized array with affirmation numbers
  const newArray = preReceived.map((item, i) => ({
    affirmationNumer: i,
    affiramtion: item.affiramtion
  }));

  // Directory and file setup
  const affirmationsDir = path.join(__dirname, 'affirmations');
  const affirmationsFile = path.join(affirmationsDir, 'affirmations.txt');

  // Ensure folder exists
  if (!fs.existsSync(affirmationsDir)) {
    fs.mkdirSync(affirmationsDir, { recursive: true });
  }

  // Convert array items to strings
  const dataToWrite = newArray.map(item => JSON.stringify(item)).join('\n') + '\n';

  // ✅ OVERWRITE the file instead of appending
  fs.writeFileSync(affirmationsFile, dataToWrite, 'utf8');

  res.send('Affirmations saved successfully (file overwritten)!');
});



app.get("/getAffirmationList", (req, res) => {
const affirmationsFile = path.join(__dirname, 'affirmations', 'affirmations.txt');
console.log("Called")
  if (!fs.existsSync(affirmationsFile)) {
    return res.json([]); // return empty list if file doesn't exist
  }

  const fileData = fs.readFileSync(affirmationsFile, 'utf8');
  const lines = fileData.trim().split('\n').filter(Boolean);

  // Convert each line back to JSON
  const affirmations = lines.map(line => {
    try {
      return JSON.parse(line);
    } catch {
      return { text: line }; // fallback in case of invalid JSON
    }
  });

  res.json(affirmations);
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
