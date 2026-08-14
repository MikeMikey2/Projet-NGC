import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Component/Dashboard/Dashboard';
import LoginSignUp from './Component/loginSignUp/loginSignUp';
import Userlist from './Component/Userlist/Userlist';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userlist" element={<Userlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;