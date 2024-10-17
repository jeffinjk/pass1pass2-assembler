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
        <pre className="output-text">H^COPY^001000^000012<br/>
T^1000^0F^00100C18100D1C100F0C1012435345<br/>
T^100F^03^000002<br/>
E^001000<br/>
</pre>
      </div>
    </div>
  );
};

export default RecordOutput;
