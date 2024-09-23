import React, { useState, useEffect } from 'react';

const SymtabOutput = () => {
  const [symtabOutput, setSymtabOutput] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/symtab-output')
      .then((response) => response.text())
      .then((data) => setSymtabOutput(data));
  }, []);

  return (
    <div>
      <h2>Symbol Table</h2>
      <pre>{symtabOutput}</pre>
    </div>
  );
};

export default SymtabOutput;