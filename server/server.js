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
  let output = '';
  let symtab = {};
  let locctr = 0;
  let start = 0;

  // Read the intermediate file for pass 1
  const intermediateLines = fs.readFileSync('intermediate.txt', 'utf8').split('\n');

  intermediateLines.forEach((line) => {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 3) return; // Skip empty or invalid lines

    const [label, opcode, operand] = parts;

    // Handle START directive
    if (opcode === 'START') {
      start = parseInt(operand, 10);
      locctr = start;
      output += `${line}\n`;
      return;
    }

    // Handle END directive
    if (opcode === 'END') {
      output += `${locctr}\t${label}\t${opcode}\t${operand}\n`;
      return;
    }

    // Record the symbol in the symbol table if label is not empty
    if (label !== '**') {
      symtab[label] = locctr;
    }

    // Increment locctr based on opcode type
    if (opcode === 'WORD') {
      locctr += 3;
    } else if (opcode === 'RESW') {
      locctr += 3 * parseInt(operand, 10);
    } else if (opcode === 'BYTE') {
      locctr += 1; // Assuming each BYTE is 1
    } else if (opcode === 'RESB') {
      locctr += parseInt(operand, 10);
    } else {
      // Look for opcode in the optab
      const optabLines = fs.readFileSync('optab.txt', 'utf8').split('\n');
      for (let i = 0; i < optabLines.length; i++) {
        const [code, mnemonic] = optabLines[i].trim().split(/\s+/);
        if (opcode === code) {
          locctr += 3; // Standard instruction length
          break;
        }
      }
    }

    // Write to output file for pass 1
    output += `${locctr}\t${label}\t${opcode}\t${operand}\n`;
  });

  // Pass 2 logic would go here - not fully implemented as it requires more specific rules

  return output;
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
