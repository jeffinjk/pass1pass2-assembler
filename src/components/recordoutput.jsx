import React, { useState, useEffect } from 'react';

const RecordOutput = () => {
  const [recordOutput, setRecordOutput] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/record-output')
      .then(response => response.text())
      .then(data => setRecordOutput(data));
  }, []);

  return (
    <div className="container">
      <h2 className="heading">Record Output</h2>
      <div className="output-box">
        <pre className="output-text">{recordOutput}</pre>
      </div>
    </div>
  );
};

export default RecordOutput;
