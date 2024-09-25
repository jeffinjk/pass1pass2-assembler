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
    <div className="flex items-center justify-center h-screen">
      <form 
        onSubmit={handleSubmit} 
        className="bg-navy-blue shadow-lg p-8 rounded-md"
      >
        <div className="mb-4">
          <label className="block text-white">Input File:</label>
          <input 
            type="file" 
            onChange={(e) => setInputFile(e.target.files[0])} 
            className="text-white bg-dark-blue border-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">OPTAB File:</label>
          <input 
            type="file" 
            onChange={(e) => setOptabFile(e.target.files[0])} 
            className="text-white bg-dark-blue border-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <button 
          type="submit" 
          className="bg-dark-violet text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Submit Files
        </button>
      </form>
    </div>
  );
};

export default UploadFiles;
