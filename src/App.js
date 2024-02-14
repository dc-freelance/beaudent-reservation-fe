// Resources Import
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Screens Import
import Index from './screens/Index';

// Styles Import
import './styles/main-styles/main.css';
import ServiceOption from './screens/ServiceOption';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />}></Route>
        <Route path='/services' element={<ServiceOption />}></Route>
      </Routes>
    </Router>
  );
};

export default App;