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
        <pre className="output-text">ALPHA   100c<br/>
ONE     100f<br/>
TWO     1011<br/>
BETA    1014<br/></pre>
      </div>
    </div>
  );
};

export default SymtabOutput;
