const express = require('express');
const fileUpload = require('express-fileupload');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(fileUpload());

app.post('/upload', (req, res) => {
  const files = req.files;

  if (!files || Object.keys(files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Save the uploaded files
  Object.keys(files).forEach((key) => {
    let file = files[key];
    file.mv(path.join(__dirname, file.name), (err) => {
      if (err) {
        console.error(`File moving error: ${err}`);
        return res.status(500).send(err);
      }
    });
  });

  // Run the Python script after uploading
  exec('python passpy.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      console.error(`stderr: ${stderr}`);
      return res.status(500).send(`Error executing script: ${stderr}`);
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

app.get('/symtab-output', (req, res) => {
  fs.readFile(path.join(__dirname, 'symtab.txt'), 'utf8', (err, data) => {
    if (err) return res.status(500).send(err);
    res.send(data);
  });
});

app.get('/record-output', (req, res) => {
  fs.readFile(path.join(__dirname, 'record.txt'), 'utf8', (err, data) => {
    if (err) return res.status(500).send(err);
    res.send(data);
  });
});

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
