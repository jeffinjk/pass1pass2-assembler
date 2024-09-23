import React, { useState, useEffect } from 'react';

const App = () => {
    const [inputTable, setInputTable] = useState('');
    const [intermediateTable, setIntermediateTable] = useState('');
    const [symbolTable, setSymbolTable] = useState('');
    const [length, setLength] = useState('');

    const passOne = async () => {
        const inputFile = 'input.txt';  // Adjust according to your environment
        const optabFile = 'optab.txt';
        const symtabFile = 'symtab.txt';
        const intermediateFile = 'intermediate.txt';
        const lengthFile = 'length.txt';

        const inputData = await fetch(inputFile).then(res => res.text());
        const optabData = await fetch(optabFile).then(res => res.text());

        const inputLines = inputData.split('\n').map(line => line.trim()).filter(Boolean);
        const optabLines = optabData.split('\n').map(line => line.trim());

        let locctr = 0, start = 0;
        let outputIntermediate = '';
        let outputSymtab = '';

        for (let line of inputLines) {
            const parts = line.split(/\s+/);
            let label = '**', opcode = '', operand = '';

            if (parts.length === 3) {
                label = parts[0];
                opcode = parts[1];
                operand = parts[2];
            } else if (parts.length === 2) {
                opcode = parts[0];
                operand = parts[1];
            } else if (parts.length === 1) {
                opcode = parts[0];
            }

            if (opcode === "START") {
                start = parseInt(operand, 16);
                locctr = start;
                outputIntermediate += `\t${label}\t${opcode}\t${operand}\n`;
                continue;
            }

            outputIntermediate += `${locctr.toString(16).toUpperCase()}\t${label}\t${opcode}\t${operand}\n`;

            if (label !== '**' && label.trim()) {
                outputSymtab += `${label}\t${locctr.toString(16).toUpperCase()}\n`;
            }

            let foundOpcode = false;

            for (let optabLine of optabLines) {
                const [code] = optabLine.split(/\s+/);
                if (opcode === code) {
                    locctr += 3;
                    foundOpcode = true;
                    break;
                }
            }

            if (!foundOpcode) {
                switch (opcode) {
                    case "WORD":
                        locctr += 3;
                        break;
                    case "RESW":
                        locctr += 3 * parseInt(operand);
                        break;
                    case "BYTE":
                        locctr += 1;
                        break;
                    case "RESB":
                        locctr += parseInt(operand);
                        break;
                }
            }
        }

        outputIntermediate += `${locctr.toString(16).toUpperCase()}\tEND\n`;

        const lengthValue = locctr - start;
        setLength(lengthValue.toString(16).toUpperCase());
        setIntermediateTable(outputIntermediate);
        setSymbolTable(outputSymtab);

        // Save to files (in a Node.js environment, you would write to files)
        console.log('Intermediate Table:', outputIntermediate);
        console.log('Symbol Table:', outputSymtab);
        console.log('Program Length:', lengthValue.toString(16).toUpperCase());
    };

    useEffect(() => {
        passOne();
    }, []);

    return (
        <div>
            <h1>Pass 1 Assembler Output</h1>
            <h2>Input Table</h2>
            <pre>{inputTable}</pre>
            <h2>Intermediate Table</h2>
            <pre>{intermediateTable}</pre>
            <h2>Symbol Table</h2>
            <pre>{symbolTable}</pre>
            <h2>Program Length</h2>
            <p>{length}</p>
        </div>
    );
};

export default App;
