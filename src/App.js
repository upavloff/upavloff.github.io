import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Publications from './Publications';
import Posts from './Posts';
import CV from './CV';
import MainLayout from './MainLayout';
// import PostContent from './PostContent';

import './App.css';

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


        {/* Define Routes */}
        <Routes>
          {/* Main Layout */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Publications />
              </MainLayout>
            }
          />
          <Route
            path="/posts"
            element={
              <MainLayout>
                <Posts />
              </MainLayout>
            }
          />
          <Route
            path="/cv"
            element={
              <MainLayout>
                <CV />
              </MainLayout>
            }
          />

          {/* Post Content -> to update when good inclusion of markdown.
          <Route
            path="/posts/:postName"
            element={<PostContent />}
            />
            */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
