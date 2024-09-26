import React, { useEffect, useState } from 'react';
import picProfile from './assets/picProfile.jpeg';
import CV from './assets/Pavloff_Resume.pdf';
import Posts from './Posts';
import './App.css';
import { SiGmail, SiGooglescholar, SiLetterboxd, SiGithub, SiLinkedin, SiStackexchange, SiLichess, SiDblp } from 'react-icons/si';

function App() {
  const [activeSection, setActiveSection] = useState('publications'); // Default section
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isToggleVisible, setIsToggleVisible] = useState(false);

  // Check user's system preference on initial load
  useEffect(() => {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && userPrefersDark)) {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle the theme and save to localStorage
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const showToggle = () => {
    setIsToggleVisible(true); // Set state to true when hovered
  };

  // Add dark or light mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="App">

      <div className="hover-area" onMouseEnter={showToggle}></div>
      <div className={`toggle-container ${isToggleVisible ? 'visible' : ''}`}>
        <input
          type="checkbox"
          id="theme-toggle"
          className="theme-toggle-checkbox"
          checked={isDarkMode}
          onChange={handleThemeToggle}
        />
        <label htmlFor="theme-toggle" className="theme-toggle-label">
          <span className="theme-toggle-label-background"></span>
        </label>
      </div>

      <section className="about-articles-section">

        {/* About Me Section with Neomorphism Effect */}
        <div className="about-me">
          <h1>Ulysse Pavloff</h1>
          {/* <img src={picProfile} alt="Profile" className="profile-pic" /> */}
          <p>
            PhD in Computer Science specializing in Blockchain, Game Theory,
            and ZK-SNARKs. I have taught at École Polytechnique, HEC, IUT Orsay and ENSIIE.
          </p>
          <h3 style={{ marginTop: '30px' }}>Connect with me</h3>
          <ul className="social-list">
            <li>
              <a href="mailto:pavloffulysse@gmail.com" target="_blank" rel="noopener noreferrer" data-tooltip="pavloffulysse@gmail.com">
                <SiGmail />
              </a>
            </li>
            <li>
              <a href="https://github.com/upavloff" target="_blank" rel="noopener noreferrer" data-tooltip="GitHub">
                <SiGithub />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/ulysse-pavloff" target="_blank" rel="noopener noreferrer" data-tooltip="LinkedIn">
                <SiLinkedin />
              </a>
            </li>
            <li>
              <a href="https://scholar.google.com/citations?user=f1mEJ54AAAAJ&hl=fr" target="_blank" rel="noopener noreferrer" data-tooltip="Google Scholar">
                <SiGooglescholar />
              </a>
            </li>
            <li>
              <a href="https://ethereum.stackexchange.com/users/86774/upavloff" target="_blank" rel="noopener noreferrer" data-tooltip="Stack Exchange">
                <SiStackexchange />
              </a>
            </li>
            <li>
              <a href="https://lichess.org/@/Udur" target="_blank" rel="noopener noreferrer" data-tooltip="Lichess">
                <SiLichess />
              </a>
            </li>
            <li>
              <a href="https://letterboxd.com/upavloff/" target="_blank" rel="noopener noreferrer" data-tooltip="Letterboxd">
                <SiLetterboxd />
              </a>
            </li>
            <li>
              <a href="https://dblp.org/pid/331/3775.html" target="_blank" rel="noopener noreferrer" data-tooltip="DBLP">
                <SiDblp />
              </a>
            </li>
          </ul>


        </div>

        {/* Right Section with Buttons for Section Switching */}
        <div className="right-section">
          <div className="buttons-container">
            <button className={activeSection === 'publications' ? 'active' : ''} onClick={() => setActiveSection('publications')}>Publications</button>
            <button className={activeSection === 'posts' ? 'active' : ''} onClick={() => setActiveSection('posts')}>Posts</button>
            <button className={activeSection === 'cv' ? 'active' : ''} onClick={() => setActiveSection('cv')}>CV</button>
          </div>

          <div className={`content-container ${activeSection === 'publications' ? 'active' : ''}`}>
            <h2>Publications</h2>
            <ul>
              <li>
                <a href="link-to-article-1.pdf" target="_blank" rel="noopener noreferrer"><strong>Incentive Compatibility of Ethereum's PoS Consensus Protocol. </strong></a>
                Pavloff, U., Amoussou-Guenou, Y., & Tucci-Piergiovanni, S. (2024). 28th International Conference on Principles of Distributed Systems, OPODIS 2024.
              </li>
              <li>
                <a href="https://ieeexplore.ieee.org/document/10646904" target="_blank" rel="noopener noreferrer"><strong>Byzantine Attacks Exploiting Penalties in Ethereum PoS. </strong></a>
                Pavloff, U., Amoussou-Guenou, Y., & Tucci-Piergiovanni, S. (2024). 54th Annual IEEE/IFIP International Conference on Dependable Systems and Networks, DSN 2024, Brisbane, QSL, Australia.
              </li>
              <li>
                <a href="https://dl.acm.org/doi/10.1145/3555776.3577655" target="_blank" rel="noopener noreferrer"><strong>Ethereum Proof-of-Stake under Scrutiny. </strong></a>
                Pavloff, U., Amoussou-Guenou, Y., & Tucci-Piergiovanni, S. (2023, March). In Proceedings of the 38th ACM/SIGAPP Symposium on Applied Computing (pp. 212-221).
              </li>
              <li>
                <a href="https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.OPODIS.2023.4" target="_blank" rel="noopener noreferrer"><strong>The Synchronization Power of Auditable Registers. </strong></a>
                Attiya, H., Del Pozzo, A., Milani, A., Pavloff, U., & Rapetti, A. (2023). 27th International Conference on Principles of Distributed Systems, OPODIS 2023.
              </li>
              <li>
                <a href="https://arxiv.org/abs/2210.08844" target="_blank" rel="noopener noreferrer"><strong>Sequential Elimination Voting Games. </strong></a>
                Pavloff, U., Cazenave, T., & Lang, J. (2022). arXiv preprint.
              </li>
            </ul>

          </div>

          <div className={`content-container ${activeSection === 'posts' ? 'active' : ''}`}>
            <h2>Posts</h2>
            {/* <p>Here are some posts</p> */}
            <Posts />
          </div>

          <div className={`content-container ${activeSection === 'cv' ? 'active' : ''}`}>
            <h2>About me</h2>
            <div className="cv-content">
              {/* Text about you */}
              <div className="cv-text">
                <p>
                  I am Ulysse Pavloff, a PhD in Computer Science specializing in Blockchain, Game Theory,
                  and ZK-SNARKs. With teaching experience at École Polytechnique, HEC, and ENSIIE, I am passionate about research and technology.
                </p>
                {/* Link to CV */}
                <a href={CV} target="_blank" rel="noopener noreferrer" className="cv-link">
                  View my full CV [PDF]
                </a>      (updated 20/09/2024)
              </div>
              {/* Profile image */}
              <div className="cv-image">
                <img src={picProfile} alt="Ulysse Pavloff" />
              </div>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}

export default App;
