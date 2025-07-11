import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to="/crypto" style={linkStyle}>
        Crypto Dashboard
      </Link>
      <Link to="/weather" style={linkStyle}>
        Weather App
      </Link>
      <Link to="/todo" style={linkStyle}>
        To-Do List App
      </Link>
    </nav>
  );
}

const navStyle: React.CSSProperties = {
  backgroundColor: '#282c34',
  padding: '1rem 2rem',
  display: 'flex',
  gap: '1rem',
};

const linkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold',
};

