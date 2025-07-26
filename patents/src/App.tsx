import React from 'react';

import MainLayout from './layouts/MainLayout';
import { MainPage } from './pages/Main';
import './App.css';

const App: React.FC = () => {
  return <MainLayout><MainPage /></MainLayout>;
};

export default App;
