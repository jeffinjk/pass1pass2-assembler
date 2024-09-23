import React, { useState } from 'react';

const UploadFiles = () => {
  const [inputFile, setInputFile] = useState(null);
  const [optabFile, setOptabFile] = useState(null);
  const [intermediateFile, setIntermediateFile] = useState(null);
  const [objectCodeFile, setObjectCodeFile] = useState(null);
  const [lengthFile, setLengthFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('inputFile', inputFile);
    formData.append('optabFile', optabFile);
    formData.append('intermediateFile', intermediateFile);
    formData.append('objectCodeFile', objectCodeFile);
    formData.append('lengthFile', lengthFile);

    // Send data to the backend
    await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Input File:
        <input type="file" onChange={(e) => setInputFile(e.target.files[0])} />
      </label>
      <label>
        OPTAB File:
        <input type="file" onChange={(e) => setOptabFile(e.target.files[0])} />
      </label>
      <label>
        Intermediate File:
        <input type="file" onChange={(e) => setIntermediateFile(e.target.files[0])} />
      </label>
      <label>
        Object Code File:
        <input type="file" onChange={(e) => setObjectCodeFile(e.target.files[0])} />
      </label>
      <label>
        Length File:
        <input type="file" onChange={(e) => setLengthFile(e.target.files[0])} />
      </label>
      <button type="submit">Submit Files</button>
    </form>
  );
};

export default UploadFiles;
