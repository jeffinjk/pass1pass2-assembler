import React, { useState, useEffect } from 'react';


const Pass2Output = () => {
  const [pass2Output, setPass2Output] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/pass2-output')
      .then((response) => response.text())
      .then((data) => setPass2Output(data));
  }, []);

  return (
    <div className="container">
      <h2 className="heading">Pass 2 Output (Object Code)</h2>
      <div className="output-box">
        <pre className="output-text">{pass2Output}</pre>
      </div>
    </div>
  );
};

export default Pass2Output;
