import React, { useState } from 'react';
import FileUpload from './FileUpload';

const App = () => {
    const [pass1Output, setPass1Output] = useState('');
    const [optabContent, setOptabContent] = useState('');

    const handleFilesSelected = (inputFile, optabFile) => {
        const reader1 = new FileReader();
        const reader2 = new FileReader();

        reader1.onload = (event) => {
            const inputContent = event.target.result;
            console.log("Input File Content:", inputContent);
            
            const output = processPass1(inputContent, optabContent);
            setPass1Output(output.intermediateOutput);
            console.log("Symbol Table:", output.symbolTable);
        };

        reader2.onload = (event) => {
            const optabContent = event.target.result;
            console.log("Optab File Content:", optabContent);
            setOptabContent(optabContent);
        };

        if (inputFile) {
            reader1.readAsText(inputFile);
        }
        if (optabFile) {
            reader2.readAsText(optabFile);
        }
    };

    const processPass1 = (inputContent, optabContent) => {
        const inputLines = inputContent.trim().split('\n');
        const optabLines = optabContent.trim().split('\n');

        let locctr = 0;
        let start = 0;
        let symbolTable = {};
        let intermediateOutput = [];

        inputLines.forEach((line) => {
            const [label, opcode, operand] = line.split(/\s+/);
            
            if (opcode === "START") {
                start = parseInt(operand, 10);
                locctr = start;
                intermediateOutput.push(`\t${label}\t${opcode}\t${operand}`);
            } else if (opcode === "END") {
                intermediateOutput.push(`${locctr}\t${label}\t${opcode}\t${operand}`);
                return; // Stop processing at END
            } else {
                intermediateOutput.push(`${locctr}\t${label}\t${opcode}\t${operand}`);
                if (label && label !== '**') {
                    symbolTable[label] = locctr;
                }

                // Update locctr based on opcode
                const optabEntry = optabLines.find(optabLine => optabLine.startsWith(opcode));
                if (optabEntry) {
                    locctr += 3; // Assume each opcode takes 3 bytes
                } else if (opcode === "WORD") {
                    locctr += 3;
                } else if (opcode === "RESW") {
                    locctr += 3 * parseInt(operand, 10);
                } else if (opcode === "BYTE") {
                    locctr += 1; // Adjust this as needed
                } else if (opcode === "RESB") {
                    locctr += parseInt(operand, 10);
                }
            }
        });

        return {
            symbolTable,
            intermediateOutput: intermediateOutput.join('\n'),
        };
    };

    return (
        <div>
            <h1>Two Pass Assembler</h1>
            <FileUpload onFilesSelected={handleFilesSelected} />
            <h2>Pass 1 Output:</h2>
            <pre>{pass1Output}</pre>
        </div>
    );
};

export default App;
