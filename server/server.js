const express = require('express');
const fileUpload = require('express-fileupload');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(fileUpload());

app.post('/upload', (req, res) => {
  const files = req.files;

  // Save the uploaded files
  Object.keys(files).forEach((key) => {
    let file = files[key];
    file.mv(path.join(__dirname, file.name), (err) => {
      if (err) return res.status(500).send(err);
    });
  });

  // Run the Python script after uploading
  exec('python passpy.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    res.send('Files uploaded and processed');
  });
});

app.get('/pass1-output', (req, res) => {
  fs.readFile(path.join(__dirname, 'intermediate.txt'), 'utf8', (err, data) => {
    if (err) return res.status(500).send(err);
    res.send(data);
  });
});

app.get('/pass2-output', (req, res) => {
  fs.readFile(path.join(__dirname, 'objectcode.txt'), 'utf8', (err, data) => {
    if (err) return res.status(500).send(err);
    res.send(data);
  });
});

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
