import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <main className="about">
        <h1>About Me</h1>
        <p>
          Hey, I’m Philip! I recently wrapped up my Master’s in Applied Statistics and Data Science at UCLA after a bit of a winding path. 
          I started in physics, then moved into actuarial science, and finally settled into stats and data. 
          Along the way, I gained hands-on experience interning in actuarial pricing, data analytics, and most recently as an ML Engineering intern where I was able to sharpen my skills working on real-world software projects.
        </p>
        <p>
          Currently, I’m applying my analytical and problem-solving skills in a role evaluating AI-generated content at xAI, 
          where I work on designing and refining criteria to assess model responses—helping improve the quality and accuracy of AI systems.
        </p>
        <p>
          I enjoy building practical tools and applications that make complex problems more manageable. 
          While I’m still growing my frontend skills (hence this React portfolio), I’m experienced in working with Python and its vast set of libraries, 
          and always looking to dive deeper into data science and machine learning projects.
          I’m a quick learner, curious by nature, and continue to want to contribute to projects that blend data science with software development.
        </p>
        <p>
          Outside the tech world, I competed in gymnastics and baseball for many of my early years. 
          I've recently retired to rec softball to the competitive spirit alive!
          And naturally, as a baseball-plying Bay Area native, the team I'm always rooting for is the SF Giants.
        </p>
        <p>If you want someone easy to work with who’s driven to build cool, useful things, let’s connect!</p>

        <div className="about-photo-wrapper">
          <img
            src="/me.jpeg"
            alt="Philip Carey"
            className="about-wide-photo"
          />
        </div>

      </main>
    </div>
  );
}
