import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      <h1>Welcome to My Portfolio!</h1>

      <section className="intro">
        <p>
          Hi, I’m Philip — a data enthusiast and software developer. Feel free to check out what I've been working on here.{' '}
          <Link to="/about">Learn more about me &raquo;</Link>
        </p>
      </section>

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
