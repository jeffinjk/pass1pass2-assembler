import React, { useState, useEffect } from 'react';

const SymtabOutput = () => {
  const [symtabOutput, setSymtabOutput] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/symtab-output')
      .then((response) => response.text())
      .then((data) => setSymtabOutput(data));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Symbol Table</h2>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto">{symtabOutput}</pre>
    </div>
  );
};

export default SymtabOutput;
