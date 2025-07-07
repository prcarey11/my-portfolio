import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CryptoDashboard from './components/CryptoDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto" element={<CryptoDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
