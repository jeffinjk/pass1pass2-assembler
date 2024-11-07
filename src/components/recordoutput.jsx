import React, { useState, useEffect } from 'react';

const RecordOutput = () => {
  // eslint-disable-next-line
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
        <pre className="output-text">H^COPY^001000^00001a<br/>
T^001000^0F^00100C^18100F^1C1011^0C1014^435345<br/>
T^001011^03^000002<br/>
E^001000<br/>
</pre>
      </div>
    </div>
  );
};

export default RecordOutput;
