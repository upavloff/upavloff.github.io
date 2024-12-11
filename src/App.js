import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Publications from './Publications.js';
import Posts from './Posts';
import CV from './CV';

import './App.css';
import { SiGmail, SiGooglescholar, SiGithub, SiLinkedin, SiStackexchange, SiDblp } from 'react-icons/si'; //SiLetterboxd,  SiLichess,

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isToggleVisible, setIsToggleVisible] = useState(false);

  // Check user's system preference on initial load
  useEffect(() => {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && userPrefersDark)) {
      setIsDarkMode(true);
      setIsToggleVisible(true); // Ensure toggle is visible if dark mode is active
    } else {
      setIsDarkMode(false);
      setIsToggleVisible(false); // Ensure toggle is hidden if light mode is active
    }
  }, []);

  // Toggle the theme and only store if it's different from the system preference
  const handleThemeToggle = () => {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const newTheme = !isDarkMode ? 'dark' : 'light';

    setIsDarkMode(!isDarkMode);

    // Store theme only if different from browser preference
    if ((newTheme === 'dark' && !userPrefersDark) || (newTheme === 'light' && userPrefersDark)) {
      localStorage.setItem('theme', newTheme);
    } else {
      localStorage.removeItem('theme'); // Clear storage if theme matches browser preference
    }

    setIsToggleVisible(newTheme === 'dark'); // Ensure toggle is visible when dark mode is active
  };

  // Show the toggle when hovered
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


  const preloadPostsPage = () => {
    //preload component
    import('./Posts').catch((err) =>
      console.error('Failed to preload the Posts component', err)
    );

    //preload images
    const images = [
      './assets/snarkForumla.png',
      './assets/snarkCircuit.png',
      './assets/stark.png',
      './assets/introSNARK.png',
      './assets/consensus_layer.webp',
      './assets/execution_layer.webp',
      './assets/intro_randomness.webp',
    ];

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

  };

  return (
    <Router>
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
        <div className="page">
          <div className="about-me">
            <h1>Ulysse Pavloff</h1>
            {/* <img src={picProfile} alt="Profile" className="profile-pic" /> */}
            <p>
              PhD in Computer Science, specializing in Blockchain and Game Theory.
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
              {/* <li>
              <a href="https://lichess.org/@/Udur" target="_blank" rel="noopener noreferrer" data-tooltip="Lichess">
                <SiLichess />
              </a>
            </li> 
            <li>
              <a href="https://letterboxd.com/upavloff/" target="_blank" rel="noopener noreferrer" data-tooltip="Letterboxd">
                <SiLetterboxd />
              </a>
            </li> */}
              <li>
                <a href="https://dblp.org/pid/331/3775.html" target="_blank" rel="noopener noreferrer" data-tooltip="DBLP">
                  <SiDblp />
                </a>
              </li>
            </ul>
          </div>

          <div className="right-section">
            <nav className="navigation" onMouseEnter={() => preloadPostsPage()}>
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}
              >
                Publications
              </NavLink>
              <NavLink
                to="/posts"
                className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}
              >
                Posts
              </NavLink>
              <NavLink
                to="/cv"
                className={({ isActive }) => isActive ? "nav-button active" : "nav-button"}
              >
                CV
              </NavLink>
            </nav>

            <div className="contentElement">
              <Routes>
                <Route path="/" element={<Publications />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/cv" element={<CV />} />
              </Routes>
            </div>
          </div>
        </div>

      </div>
    </Router>

  );


}

export default App;
