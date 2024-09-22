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
  const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');
  const intermediateLines = fs.readFileSync('intermediate.txt', 'utf8').split('\n');
  const optabLines = fs.readFileSync('optab.txt', 'utf8').split('\n');
  const symtabLines = fs.readFileSync('symtab.txt', 'utf8').split('\n');

  let assembledOutput = '';

  // Example assembly logic (replace with your actual logic)
  
  // Process intermediate lines and generate symbol table
  const symbols = {};
  intermediateLines.forEach(line => {
    if (line.trim()) {
      const parts = line.split(/\s+/); // Split by whitespace
      const label = parts[0];
      const opcode = parts[1];

      // Store symbol if it is a label
      if (label && opcode) {
        symbols[label] = { address: assembledOutput.length, opcode }; // Simple address assignment
        assembledOutput += `${label} ${opcode}\n`;
      }
    }
  });

  // Process opcode table
  optabLines.forEach(line => {
    if (line.trim()) {
      const parts = line.split(/\s+/);
      const mnemonic = parts[0];
      const code = parts[1];

      // Use mnemonic to replace in assembled output if needed
      assembledOutput = assembledOutput.replace(new RegExp(mnemonic, 'g'), code);
    }
  });

  // Process symbol table
  symtabLines.forEach(line => {
    if (line.trim()) {
      const parts = line.split(/\s+/);
      const label = parts[0];
      const address = parts[1];

      // Include labels in the output for reference
      assembledOutput += `Label: ${label} Address: ${address}\n`;
    }
  });

  return assembledOutput;
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
