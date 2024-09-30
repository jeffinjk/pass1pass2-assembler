import React, { useState } from 'react';


const UploadFiles = () => {
  const [inputFile, setInputFile] = useState(null);
  const [optabFile, setOptabFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('inputFile', inputFile);
    formData.append('optabFile', optabFile);

    await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Input File:</label>
          <input type="file" onChange={(e) => setInputFile(e.target.files[0])} />
        </div>
        <div className="mb-4">
          <label>OPTAB File:</label>
          <input type="file" onChange={(e) => setOptabFile(e.target.files[0])} />
        </div>
        <button type="submit">Submit Files</button>
      </form>
    </div>
  );
};

export default UploadFiles;
