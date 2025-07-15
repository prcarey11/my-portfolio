import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CryptoDashboard from './components/CryptoDashboard/CryptoDashboard';
import Navbar from './components/shared/Navbar';
import WeatherApp from './components/WeatherApp/WeatherApp';
import Todo from './pages/Todo';
import About from './pages/About/About';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto" element={<CryptoDashboard />} />
        <Route path="/weather" element={<WeatherApp />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
