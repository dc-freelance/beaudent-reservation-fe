// Resources Import
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Screens Import
import Index from './screens/Index';

// Styles Import
import './styles/main-styles/main.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />}></Route>
      </Routes>
    </Router>
  );
};

export default App;