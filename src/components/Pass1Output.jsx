import React, { useState, useEffect } from 'react';

const Pass1Output = () => {
  const [pass1Output, setPass1Output] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/pass1-output')
      .then((response) => response.text())
      .then((data) => setPass1Output(data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Pass 1 Output (Intermediate Code)</h2>
      <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
        <pre className="whitespace-pre-wrap text-gray-700 font-mono">{pass1Output}</pre>
      </div>
    </div>
  );
};

export default Pass1Output; 