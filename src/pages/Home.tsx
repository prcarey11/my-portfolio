import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      <h1>Welcome to My Portfolio!</h1>
      <p>Here are some of my projects:</p>

      <Link to="/crypto" className="project-link">
        🪙 Crypto Price Dashboard
      </Link>

      <Link to="/weather" className="project-link">
        ☀️ Weather App
      </Link>

      <Link to="/todo" className="project-link">
        📝 To-Do List App
      </Link>      
    </main>
  );
}
