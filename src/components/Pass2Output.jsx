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
        <pre className="output-text">-       COPY    START   1000     -    <br/>  
1000    -       LDA     ALPHA    00100c    <br/>
1003    -       ADD     ONE      18100f    <br/>
1006    -       SUB     TWO      1C1011    <br/>
1009    -       STA     BETA     0C1014    <br/>
100c    ALPHA   BYTE    C'CSE'   435345  <br/>
100f    ONE     RESB    2        -      <br/>
1011    TWO     WORD    2        000002  <br/>
1014    BETA    RESW    2        -      <br/>
101a    -       END     1000     -      <br/></pre>
      </div>
    </div>
  );
};

export default Pass2Output;
