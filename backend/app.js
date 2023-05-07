const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/read-json/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = `${__dirname}/json/${filename}.json`;
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading file');
      return;
    }
    
    res.json(JSON.parse(data));
  });
});

app.post('/api/write-json/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = `${__dirname}/json/${filename}.json`;
  
  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error writing file');
      return;
    }
    
    res.send('File written successfully');
  });
});