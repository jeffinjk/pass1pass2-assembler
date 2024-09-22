import React, { useState } from 'react';

function App() {
  const [inputContent, setInputContent] = useState('');
  const [intermediateContent, setIntermediateContent] = useState('');
  const [optabContent, setOptabContent] = useState('');
  const [symtabContent, setSymtabContent] = useState('');
  const [outputFileName, setOutputFileName] = useState('');
  const [output, setOutput] = useState('');

  const handleFileUpload = (event, setter) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setter(e.target.result);
    };
    
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    if (!inputContent || !intermediateContent || !optabContent || !symtabContent || !outputFileName) {
      alert("Please make sure all fields are filled out correctly.");
      return;
    }

    fetch('http://localhost:5000/assemble', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: inputContent,
        intermediate: intermediateContent,
        optab: optabContent,
        symtab: symtabContent,
        output: outputFileName
      }),
    })
    .then(response => response.json())
    .then(data => {
      setOutput(data.output); // Assuming the backend returns the assembled output
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="App">
      <h1>Pass1 Pass2 Assembler</h1>
      <div>
        <label>Input File (input.txt):</label>
        <input type="file" onChange={(e) => handleFileUpload(e, setInputContent)} />
      </div>
      <div>
        <label>Intermediate File (intermediate.txt):</label>
        <input type="file" onChange={(e) => handleFileUpload(e, setIntermediateContent)} />
      </div>
      <div>
        <label>Opcode Table (optab.txt):</label>
        <input type="file" onChange={(e) => handleFileUpload(e, setOptabContent)} />
      </div>
      <div>
        <label>Symbol Table (symtab.txt):</label>
        <input type="file" onChange={(e) => handleFileUpload(e, setSymtabContent)} />
      </div>
      <div>
        <label>Output File Name:</label>
        <input 
          type="text" 
          value={outputFileName} 
          onChange={(e) => setOutputFileName(e.target.value)} 
        />
      </div>
      <button onClick={handleSubmit} disabled={!inputContent || !intermediateContent || !optabContent || !symtabContent || !outputFileName}>
        Assemble
      </button>
      {output && (
        <div>
          <h2>Output</h2>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
