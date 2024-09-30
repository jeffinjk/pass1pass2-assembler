import React, { useState, useEffect } from 'react';


const SymtabOutput = () => {
  const [symtabOutput, setSymtabOutput] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/symtab-output')
      .then((response) => response.text())
      .then((data) => setSymtabOutput(data));
  }, []);

  return (
    <div className="container">
      <h2 className="heading">Symbol Table Output</h2>
      <div className="output-box">
        <pre className="output-text">{symtabOutput}</pre>
      </div>
    </div>
  );
};

export default SymtabOutput;
