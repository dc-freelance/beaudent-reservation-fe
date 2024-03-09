// Resources Import
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Screens Import
import Index from './screens/Index';

// Styles Import
import './styles/main-styles/main.css';
import ServiceOption from './screens/ServiceOption';
import Credential from './screens/Credential';
import Forms from './screens/Forms';
import Menu from './screens/Menu';
import Transit from './screens/Transit';

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(-1);
  }, []);
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/reservasi' element={<Index />}></Route>
        <Route path='/services' element={<ServiceOption />}></Route>
        <Route path='/credential' element={<Credential />}></Route>
        <Route path='/menu' element={<Menu />}></Route>
        <Route path='/reservation' element={<Forms />}></Route>
        <Route path='/processing' element={<Transit />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
};

export default App;