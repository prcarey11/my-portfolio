import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CryptoDashboard from './components/CryptoDashboard';
import Navbar from './components/Navbar';
import WeatherApp from './components/WeatherApp';
import Todo from './pages/Todo';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto" element={<CryptoDashboard />} />
        <Route path="/weather" element={<WeatherApp />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
