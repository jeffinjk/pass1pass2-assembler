import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadFiles from './components/UploadFiles';
import Pass1Output from './components/Pass1Output';
import Pass2Output from './components/Pass2Output';
import SymtabOutput from './components/SymtabOutput';

import './styles.css';  // Import the CSS file

const App = () => {
  return (
    <div className="container"> {/* Use the container class here */}
      <Router>
        {/* Navigation Bar */}
        <nav>
          <ul>
            <li>
              <Link to="/">Upload Files</Link>
            </li>
            <li>
              <Link to="/pass1">Pass 1 Output</Link>
            </li>
            <li>
              <Link to="/pass2">Pass 2 Output</Link>
            </li>
            <li>
              <Link to="/symtab">Symbol Table Output</Link>
            </li>
          </ul>
        </nav>

        {/* Routes for the Pages */}
        <Routes>
          <Route path="/" element={<UploadFiles />} />
          <Route path="/pass1" element={<Pass1Output />} />
          <Route path="/pass2" element={<Pass2Output />} />
          <Route path="/symtab" element={<SymtabOutput />} />
        </Routes>

        {/* Footer */}
      </Router>
    </div>
  );
};

export default App;
