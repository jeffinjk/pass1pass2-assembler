import React, { useState } from 'react';
import FileUpload from './FileUpload';

const App = () => {
    const [pass1Output, setPass1Output] = useState('');
    const [pass2Output, setPass2Output] = useState('');

    const handleFilesSelected = (inputFile, optabFile) => {
        // Read and process files here
        console.log(inputFile, optabFile);
        // Implement Pass 1 and Pass 2 logic after reading files
    };

    return (
        <div>
            <h1>Two Pass Assembler</h1>
            <FileUpload onFilesSelected={handleFilesSelected} />
            <div>
                <h2>Pass 1 Output</h2>
                <pre>{pass1Output}</pre>
                <h2>Pass 2 Output</h2>
                <pre>{pass2Output}</pre>
            </div>
        </div>
    );
};

export default App;
