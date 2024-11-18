import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';  // Adicionando .tsx
import Measurements from './pages/Measurements';  // Adicionando .tsx
import Navbar from './components/Navbar';  // Adicionando .tsx

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/measurements" element={<Measurements />} />
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;