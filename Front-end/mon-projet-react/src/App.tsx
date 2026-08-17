import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Component/ADMIN/Dashboard/Dashboard';
import LoginSignUp from './Component/ADMIN/loginSignUp/loginSignUp';
import Userlist from './Component/ADMIN/Userlist/Userlist';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/loginSignUp" replace />} />
        <Route path="/loginSignUp" element={<LoginSignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userlist" element={<Userlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;