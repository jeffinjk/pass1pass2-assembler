import React, { useState, useEffect } from 'react';

const Pass2Output = () => {
  const [pass2Output, setPass2Output] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/pass2-output')
      .then((response) => response.text())
      .then((data) => setPass2Output(data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Pass 2 Output (Object Code)</h2>
      <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
        <pre className="whitespace-pre-wrap text-gray-700 font-mono">{pass2Output}</pre>
      </div>
    </div>
  );
};

export default Pass2Output;
