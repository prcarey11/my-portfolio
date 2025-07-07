import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CryptoDashboard from './components/CryptoDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto" element={<CryptoDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
