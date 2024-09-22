import React, { useState } from 'react';

const FileUpload = ({ onFilesSelected }) => {
    const [inputFile, setInputFile] = useState(null);
    const [optabFile, setOptabFile] = useState(null);

    const handleInputFileChange = (event) => {
        setInputFile(event.target.files[0]);
    };

    const handleOptabFileChange = (event) => {
        setOptabFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onFilesSelected(inputFile, optabFile);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".txt" onChange={handleInputFileChange} />
            <input type="file" accept=".txt" onChange={handleOptabFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default FileUpload;
