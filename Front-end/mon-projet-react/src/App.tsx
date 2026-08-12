import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Component/Dashboard/Dashboard';
import LoginSignUp from './Component/loginSignUp/loginSignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;