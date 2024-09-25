import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadFiles from './components/UploadFiles';
import Pass1Output from './components/Pass1Output';
import Pass2Output from './components/Pass2Output';
import SymtabOutput from './components/SymtabOutput';

const App = () => {
  return (
    <div className="bg-dark-blue min-h-screen text-white">
      <Router>
        <nav className="bg-dark-violet p-4">
          <ul className="flex justify-center space-x-8">
            <li>
              <Link to="/" className="hover:text-gray-300">Upload Files</Link>
            </li>
            <li>
              <Link to="/pass1" className="hover:text-gray-300">Pass 1 Output</Link>
            </li>
            <li>
              <Link to="/pass2" className="hover:text-gray-300">Pass 2 Output</Link>
            </li>
            <li>
              <Link to="/symtab" className="hover:text-gray-300">Symbol Table Output</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<UploadFiles />} />
          <Route path="/pass1" element={<Pass1Output />} />
          <Route path="/pass2" element={<Pass2Output />} />
          <Route path="/symtab" element={<SymtabOutput />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
