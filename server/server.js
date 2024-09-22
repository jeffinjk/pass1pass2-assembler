const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/assemble', (req, res) => {
  const { input, intermediate, optab, symtab, output } = req.body;

  // Save the uploaded files
  fs.writeFileSync('input.txt', input);
  fs.writeFileSync('intermediate.txt', intermediate);
  fs.writeFileSync('optab.txt', optab);
  fs.writeFileSync('symtab.txt', symtab);

  // Run the assembly process
  const assembledOutput = assembleFiles();

  // Save the assembled output to the specified output file
  fs.writeFileSync(output, assembledOutput);

  // Read the output file and return its contents
  const outputContent = fs.readFileSync(output, 'utf8');
  res.json({ output: outputContent });
});

function assembleFiles() {
  // Placeholder for your assembly logic
  // You can implement the logic from your C code here

  let assembledOutput = '';

  // Example logic (replace this with your actual assembly logic):
  const inputLines = fs.readFileSync('intermediate.txt', 'utf8').split('\n');

  inputLines.forEach(line => {
    if (line.trim()) {
      assembledOutput += line + '\n'; // Modify as needed
    }
  });

  return assembledOutput;
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
