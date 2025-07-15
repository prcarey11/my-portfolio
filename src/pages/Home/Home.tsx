import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <main className="home">
      <h1>Welcome to My Portfolio!</h1>

      <section className="intro">
        <p>
          Hey! I’m Philip, a data enthusiast and software developer. Feel free to check out the different parts of this site to see what I've been up to.{' '}
          <Link to="/about">Learn more about me &raquo;</Link>
        </p>
      </section>

      <section className="projects">
        <h2>Projects</h2>
        <ul>
          <li>
            <Link to="/crypto" className="project-link">
              🪙 Crypto Price Dashboard
            </Link>
          </li>
          <li>
            <Link to="/weather" className="project-link">
              ☀️ Weather App
            </Link>
          </li>
          <li>
            <Link to="/todo" className="project-link">
              📝 To-Do List App
            </Link>
          </li>
        </ul>
      </section>

      <section className="contact">
        <h2>Get in Touch</h2>
        <p>
          You can find me on{' '}
          <a href="https://github.com/prcarey11" target="_blank" rel="noopener noreferrer">GitHub</a>,{' '}
          connect on{' '}
          <a href="https://www.linkedin.com/in/philip-carey-596980194/" target="_blank" rel="noopener noreferrer">LinkedIn</a>,{' '}
          view my{' '}
          <a href="/PhilipCarey_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>,{' '}
          or just{' '}
          <a href="mailto:prcarey11@gmail.com">shoot me an email</a>!
        </p>
      </section>
    </main>
  );
}
