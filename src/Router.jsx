import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // Your Login component
import SignUp from './pages/SignUp'; // Your new SignUp component
import Home from './pages/Home'; // Your Home component

function Router() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default Router;
