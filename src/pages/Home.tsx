import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to My Portfolio</h1>
      <p>Check out some of my projects:</p>
      <ul>
        <li>
          <Link to="/crypto">Crypto Price Dashboard</Link>
        </li>
        {/* You can add more project links here later */}
      </ul>
    </div>
  );
}
