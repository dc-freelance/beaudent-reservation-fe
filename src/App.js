// Resources Import
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Screens Import
import Index from './screens/Index';

// Styles Import
import './styles/main-styles/main.css';
import ServiceOption from './screens/ServiceOption';
import Credential from './screens/Credential';
import Forms from './screens/Forms';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />}></Route>
        <Route path='/services' element={<ServiceOption />}></Route>
        <Route path='/credential' element={<Credential />}></Route>
        <Route path='/reservation' element={<Forms />}></Route>
      </Routes>
    </Router>
  );
};

export default App;