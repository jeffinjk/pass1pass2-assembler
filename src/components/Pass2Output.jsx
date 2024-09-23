import React, { useState, useEffect } from 'react';

const Pass2Output = () => {
  const [pass2Output, setPass2Output] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/pass2-output')
      .then((response) => response.text())
      .then((data) => setPass2Output(data));
  }, []);

  return (
    <div>
      <h2>Pass 2 Output (Object Code)</h2>
      <pre>{pass2Output}</pre>
    </div>
  );
};

export default Pass2Output;
