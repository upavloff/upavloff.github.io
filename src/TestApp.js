import React, { useState } from 'react';
// import picProfile from './assets/picProfile.jpeg';
import CV from './assets/Pavloff_Resume.pdf';
import { SiGmail, SiGooglescholar, SiLetterboxd, SiGithub, SiLinkedin, SiStackexchange, SiLichess, SiDblp } from 'react-icons/si';
import './TestApp.css';

function App() {
  const [activeSection, setActiveSection] = useState('publications'); // Default section

  return (
    <div className="App">
      <section className="about-articles-section">

        {/* About Me Section with Neomorphism Effect */}
        <div className="about-me">
          <h1>Ulysse Pavloff</h1>
          {/* <img src={picProfile} alt="Profile" className="profile-pic" /> */}
          <p>
            PhD in Computer Science specializing in Blockchain, Game Theory,
            and ZK-SNARKs. I have taught at École Polytechnique, HEC, and ENSIIE.
          </p>
          <h3>Connect with me</h3>
          <ul className="social-list">
            <li>
              <a href="mailto:pavloffulysse@gmail.com" target="_blank" rel="noopener noreferrer">
                <SiGmail />
              </a>
            </li>
            <li>
              <a href="https://github.com/upavloff" target="_blank" rel="noopener noreferrer">
                <SiGithub />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/ulysse-pavloff" target="_blank" rel="noopener noreferrer">
                <SiLinkedin />
              </a>
            </li>
            <li>
              <a href="https://scholar.google.com/citations?user=f1mEJ54AAAAJ&hl=fr" target="_blank" rel="noopener noreferrer">
                <SiGooglescholar />
              </a>
            </li>
            <li>
              <a href="https://stackexchange.com/users/86774/upavloff" target="_blank" rel="noopener noreferrer">
                <SiStackexchange />
              </a>
            </li>
            <li>
              <a href="https://lichess.org/@/Udur" target="_blank" rel="noopener noreferrer">
                <SiLichess />
              </a>
            </li>
            <li>
              <a href="https://letterboxd.com/upavloff/" target="_blank" rel="noopener noreferrer">
                <SiLetterboxd />
              </a>
            </li>
            <li>
              <a href="https://dblp.org/pid/331/3775.html" target="_blank" rel="noopener noreferrer">
                <SiDblp />
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section with Buttons for Section Switching */}
        <div className="right-section">
          <div className="buttons-container">
            <button className={activeSection === 'publications' ? 'active' : ''} onClick={() => setActiveSection('publications')}>Publications</button>
            <button className={activeSection === 'articles' ? 'active' : ''} onClick={() => setActiveSection('articles')}>Articles</button>
            <button className={activeSection === 'cv' ? 'active' : ''} onClick={() => setActiveSection('cv')}>CV</button>
          </div>

          <div className={`content-container ${activeSection === 'publications' ? 'active' : ''}`}>
            <h2>Publications</h2>
            <ul>
              <li>
                <a href="link-to-article-1.pdf"><strong>Incentive Compatibility of Ethereum's PoS Consensus Protocol. </strong></a>
                Pavloff, U., Amoussou-Guenou, Y., & Tucci-Piergiovanni, S. (2024). 28th International Conference on Principles of Distributed Systems, OPODIS 2024.
              </li>
              <li>
                <a href="link-to-article-2.pdf"><strong>Byzantine Attacks Exploiting Penalties in Ethereum PoS. </strong></a>
                Pavloff, U., Amoussou-Guenou, Y., & Tucci-Piergiovanni, S. (2024). 54th Annual IEEE/IFIP International Conference on Dependable Systems and Networks, DSN 2024, Brisbane, QSL, Australia.
              </li>
              <li>
                <a href="link-to-article-3.pdf"><strong>Ethereum Proof-of-Stake under Scrutiny. </strong></a>
                Pavloff, U., Amoussou-Guenou, Y., & Tucci-Piergiovanni, S. (2023, March). In Proceedings of the 38th ACM/SIGAPP Symposium on Applied Computing (pp. 212-221).
              </li>
              <li>
                <a href="link-to-article-4.pdf"><strong>The Synchronization Power of Auditable Registers. </strong></a>
                Attiya, H., Del Pozzo, A., Milani, A., Pavloff, U., & Rapetti, A. (2023). 27th International Conference on Principles of Distributed Systems, OPODIS 2023.
              </li>
              <li>
                <a href="link-to-article-5.pdf"><strong>Sequential Elimination Voting Games. </strong></a>
                Pavloff, U., Cazenave, T., & Lang, J. (2022). arXiv preprint.
              </li>
            </ul>

          </div>

          <div className={`content-container ${activeSection === 'articles' ? 'active' : ''}`}>
            <h2>Articles</h2>
            <p>Articles section content here.</p>
          </div>

          <div className={`content-container ${activeSection === 'cv' ? 'active' : ''}`}>
            <h2>CV</h2>
            <p>Curriculum Vitae content here.</p>
            <div className="pdf-container">
              <iframe src={CV} width="100%" height="985px" title="CV"></iframe>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}

export default App;
