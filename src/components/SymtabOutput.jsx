import React, { useState, useEffect } from 'react';

const SymtabOutput = () => {
  const [symtabOutput, setSymtabOutput] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/symtab-output')
      .then((response) => response.text())
      .then((data) => setSymtabOutput(data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Symbol Table</h2>
      <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
        <pre className="whitespace-pre-wrap text-gray-700 font-mono">{symtabOutput}</pre>
      </div>
    </div>
  );
};

export default SymtabOutput;
