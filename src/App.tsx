// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import ArtworkDetails from './pages/ArtworkDetails';
import DepartmentSelection from './pages/DepartmentSelection';

// Main application component
const App: React.FC = () => {

  // Placeholder function to reset Home state
  const resetHome = () => {
  };


  return (
    <Router>
      <Navbar resetHome={resetHome} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/artwork/:objectId" element={<ArtworkDetails />} />
        <Route path="/departments" element={<DepartmentSelection />} />
      </Routes>
    </Router>
  );
};

export default App;
