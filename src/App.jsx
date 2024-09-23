import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadFiles from './components/UploadFiles';
import Pass1Output from './components/Pass1Output';
import Pass2Output from './components/Pass2Output';
import SymtabOutput from './components/SymtabOutput';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Upload Files</Link></li>
          <li><Link to="/pass1">Pass 1 Output</Link></li>
          <li><Link to="/pass2">Pass 2 Output</Link></li>
          <li><Link to="/symtab">Symbol Table Output</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<UploadFiles />} />
        <Route path="/pass1" element={<Pass1Output />} />
        <Route path="/pass2" element={<Pass2Output />} />
        <Route path="/symtab" element={<SymtabOutput />} />
      </Routes>
    </Router>
  );
};

export default App;
