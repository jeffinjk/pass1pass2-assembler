import React, { useState, useEffect } from 'react';

const Pass1Output = () => {
  const [pass1Output, setPass1Output] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/pass1-output')
      .then((response) => response.text())
      .then((data) => setPass1Output(data));
  }, []);

  return (
    <div>
      <h2>Pass 1 Output (Intermediate Code)</h2>
      <pre>{pass1Output}</pre>
    </div>
  );
};

export default Pass1Output;
