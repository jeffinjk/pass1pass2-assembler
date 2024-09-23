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
  let locctr = 0; // Initialize location counter

  // Process intermediate lines and generate output
  intermediateLines.forEach(line => {
    if (line.trim()) {
      const parts = line.split(/\s+/); // Split by whitespace
      const label = parts[0];
      const opcode = parts[1];
      let operand = parts[2] || ''; // Handle optional operand

      // Format output line
      assembledOutput += `${locctr.toString(16).toUpperCase().padStart(4, '0')} ${label} ${opcode} ${operand}\n`;
      
      // Update locctr based on opcode
      locctr += calculateSize(opcode, operand);
    }
  });

  // Process opcode table and replace mnemonics with opcodes
  optabLines.forEach(line => {
    if (line.trim()) {
      const parts = line.split(/\s+/);
      const mnemonic = parts[0];
      const code = parts[1];

      // Replace mnemonic with code in assembled output if needed
      assembledOutput = assembledOutput.replace(new RegExp(`\\b${mnemonic}\\b`, 'g'), code);
    }
  });

  // Include symbols in the output for reference
  symtabLines.forEach(line => {
    if (line.trim()) {
      const parts = line.split(/\s+/);
      const label = parts[0];
      const address = parts[1];

      // Add to assembled output
      assembledOutput += `Label: ${label} Address: ${address}\n`;
    }
  });

  return assembledOutput;
}

// Helper function to calculate the size of each instruction
function calculateSize(opcode, operand) {
  // Example size calculation logic (you can customize based on your opcodes)
  if (opcode === "WORD") return 3; // 3 bytes for WORD
  if (opcode === "RESW") return 3 * parseInt(operand, 10); // 3 bytes for each word
  if (opcode === "BYTE") return 1; // 1 byte for BYTE
  if (opcode === "RESB") return parseInt(operand, 10); // Number of bytes for RESB
  return 3; // Default size for other opcodes
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
