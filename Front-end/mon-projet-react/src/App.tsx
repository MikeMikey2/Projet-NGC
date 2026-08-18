import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Component/ADMIN/Dashboard/Dashboard';
import LoginSignUp from './Component/ADMIN/loginSignUp/loginSignUp';
import Userlist from './Component/ADMIN/Userlist/Userlist';
import Freeprojects from './Component/ADMIN/Freeprojects/Freeprojects';
import Myprojects from './Component/ADMIN/Myprojects/Myprojects';
import Addprojects from './Component/ADMIN/Freeprojects/Addprojects/Addprojects';
import Document from './Component/ADMIN/Document/Document';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/loginSignUp" replace />} />
        <Route path="/loginSignUp" element={<LoginSignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userlist" element={<Userlist />} />
        <Route path="/Freeprojects" element={<Freeprojects />} />  
        <Route path='/Myprojects' element={<Myprojects/>}/>
        <Route path='/Addprojects' element={<Addprojects/>}/>
        <Route path='/Document' element={<Document/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;