import React, { useState } from 'react';

const FileUpload = ({ onFilesSelected }) => {
    const [inputFile, setInputFile] = useState(null);
    const [optabFile, setOptabFile] = useState(null);

    const handleInputChange = (event) => {
        setInputFile(event.target.files[0]);
    };

    const handleOptabChange = (event) => {
        setOptabFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (inputFile && optabFile) {
            onFilesSelected(inputFile, optabFile);
        } else {
            alert("Please select both input and optab files.");
        }
    };

    return (
        <div>
            <h2>Upload Files</h2>
            <div>
                <input
                    type="file"
                    accept=".txt"
                    onChange={handleInputChange}
                />
                <label>Input File</label>
            </div>
            <div>
                <input
                    type="file"
                    accept=".txt"
                    onChange={handleOptabChange}
                />
                <label>Optab File</label>
            </div>
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
