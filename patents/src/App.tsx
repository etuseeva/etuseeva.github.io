import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import { MainPage } from './pages/Main';
import { PatentPage } from './pages/Patent';
import { Patent876105Page } from './pages/Patent876105';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/patent" element={<PatentPage />} />
          <Route path="/patent-876105" element={<Patent876105Page />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
