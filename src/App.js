import React, { useEffect, useCallback, useRef } from 'react';
import { SiGmail, SiGooglescholar, SiLetterboxd, SiGithub, SiLinkedin, SiStackexchange, SiLichess, SiDblp } from 'react-icons/si';
import Grid from './Grid';
import { gsap } from 'gsap';
import './App.css';


const words = ['Computer Science', 'Blockchain', 'Game Theory'];

function App() {
  const frontDivRef = useRef(null);
  const backDivsRef = useRef([]);

  // Function to check if a point is inside a polygon (hexagon in this case)
  const isPointInPolygon = (point, polygon) => {
    const [x, y] = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];

      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  // Memoize the getHexagonCoordinates function to prevent unnecessary re-creation
  const getHexagonCoordinates = useCallback((containerRect) => {
    const hexagonPoints = [
      [0.5, 0],   // Top center
      [1, 0.25],  // Top right
      [1, 0.75],  // Bottom right
      [0.5, 1],   // Bottom center
      [0, 0.75],  // Bottom left
      [0, 0.25]   // Top left
    ];

    return hexagonPoints.map(([x, y]) => [
      containerRect.left + x * containerRect.width,
      containerRect.top + y * containerRect.height
    ]);
  }, []);

  // Memoize the checkHexOverlap function
  const checkHexOverlap = useCallback(() => {
    const frontDiv = frontDivRef.current;
    const backDivs = backDivsRef.current;

    const hexRect = frontDiv.getBoundingClientRect();
    const hexPolygon = getHexagonCoordinates(hexRect);

    backDivs.forEach(dot => {
      if (dot) {
        const dotRect = dot.getBoundingClientRect();

        // Get the four corners of the rectangle around the dot-point
        const dotCorners = [
          [dotRect.left, dotRect.top],           // Top-left corner
          [dotRect.right, dotRect.top],          // Top-right corner
          [dotRect.right, dotRect.bottom],       // Bottom-right corner
          [dotRect.left, dotRect.bottom]         // Bottom-left corner
        ];

        // Check if any corner of the dot-point rectangle is inside the hexagon
        const isOverlapping = dotCorners.some(corner => isPointInPolygon(corner, hexPolygon));

        if (isOverlapping) {
          dot.style.visibility = 'hidden'; // Hide if any corner of the rectangle is inside the hexagon
        } else {
          dot.style.visibility = 'visible'; // Show if none of the corners overlap
        }
      }
    });
  }, [getHexagonCoordinates]); // Include getHexagonCoordinates in the dependency array

  //changing qualification parts
  const textRef = useRef();
  const currentWordIndexRef = useRef(0);

  const smokeEffect = useCallback(() => {
    const nextWord = words[(currentWordIndexRef.current + 1) % words.length].split('');
    currentWordIndexRef.current = (currentWordIndexRef.current + 1) % words.length;

    const firstLetterPosition = textRef.current.children[0].getBoundingClientRect();

    const smokeTimeline = gsap.timeline();
    smokeTimeline.to(textRef.current.children, {
      opacity: 0,
      filter: 'blur(10px)',
      x: (i) => {
        const letterPosition = textRef.current.children[i].getBoundingClientRect();
        return firstLetterPosition.left - letterPosition.left;
      },
      y: (i) => {
        const letterPosition = textRef.current.children[i].getBoundingClientRect();
        return firstLetterPosition.top - letterPosition.top;
      },
      duration: .8,
      stagger: -0.05,
      overwrite: false,
      onComplete: () => {
        // Replace with new word after the smoke effect
        updateText(nextWord);
        // Animate new letters coming from the position of the first letter and going to their respective places
        gsap.fromTo(
          textRef.current.children,
          {
            opacity: 0,
            filter: 'blur(10px)',
            x: firstLetterPosition.left - textRef.current.children[0].getBoundingClientRect().left,
            y: firstLetterPosition.top - textRef.current.children[0].getBoundingClientRect().top,
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            x: 0,
            y: 0,
            duration: .8,
            stagger: 0.05,
          }
        );
      },
    });
  }, [currentWordIndexRef]);



  const updateText = (newWord) => {
    const currentLetters = textRef.current.children;
    // Clear current letters and replace with new word
    for (let i = 0; i < currentLetters.length; i++) {
      currentLetters[i].textContent = newWord[i] === ' ' ? '\u00A0' : newWord[i];
    }
  };



  // Use useEffect to check overlap after mounting
  useEffect(() => {
    // Initial check after component mounts
    checkHexOverlap();

    const interval = setInterval(() => {
      smokeEffect();
    }, 15000);

    // Add event listeners for scroll and resize to update the overlap dynamically
    window.addEventListener('scroll', checkHexOverlap);
    window.addEventListener('resize', checkHexOverlap);

    // Cleanup event listeners when component unmounts
    return () => {
      window.removeEventListener('scroll', checkHexOverlap);
      window.removeEventListener('resize', checkHexOverlap);
      clearInterval(interval);
    };
  }, [checkHexOverlap, smokeEffect]); // Include checkHexOverlap in the dependency array

  const shineRef = useRef(null);

  const handleMouseLeaveShine = () => {
    gsap.fromTo(
      shineRef.current,
      { x: '-100%' },  // Start position (outside of the hexagon)
      { x: '400%', duration: 1.5, ease: 'power1.inOut' }  // Move across the hexagon
    );
  };


  return (
    <div className="App">
      <div className='title-container' ref={frontDivRef} onMouseLeave={handleMouseLeaveShine} >
        <div className="shine" ref={shineRef}></div>
        <h1>Ulysse Pavloff</h1>
        <span className="changing-text-container">
          <p>Phd in{' '}
            <span ref={textRef} className="changing-text">
              {words[0].split('').map((letter, index) => (
                <span key={index} style={{ display: 'inline-block' }}>
                  {letter}
                </span>
              ))}
            </span>
          </p>
        </span>
      </div>
      <Grid setDotRef={(el, index) => (backDivsRef.current[index] = el)} />

      <section className="about-articles-section">
        <div className="about-me">
          <h2>About Me</h2>
          <p>
            I am Ulysse Pavloff, a PhD in Computer Science specializing in Blockchain, Game Theory,
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
        <div className="articles-list">
          <h2>Scientific Articles</h2>
          <ul>
            <li>
              <strong>Incentive Compatibility of Ethereum's PoS Consensus Protocol.</strong><br />
              Pavloff, U., Amoussou-Guenou, Y., & Tucci-Piergiovanni, S. (2024). 28th International Conference on Principles of Distributed Systems, OPODIS 2024.
              <a href="link-to-article-1.pdf">[IEEE]</a>
            </li>
            <li>
              <strong>Byzantine Attacks Exploiting Penalties in Ethereum PoS.</strong><br />
              Pavloff, U., Amoussou-Guenou, Y., & Tucci-Piergiovanni, S. (2024). 54th Annual IEEE/IFIP International Conference on Dependable Systems and Networks, DSN 2024, Brisbane, QSL, Australia.
              <a href="link-to-article-2.pdf">[IEEE]</a><a href="link-to-article-2.pdf">[arXiv]</a>
            </li>
            <li>
              <strong>Ethereum Proof-of-Stake under Scrutiny.</strong><br />
              Pavloff, U., Amoussou-Guenou, Y., & Tucci-Piergiovanni, S. (2023, March). In Proceedings of the 38th ACM/SIGAPP Symposium on Applied Computing (pp. 212-221).
              <a href="link-to-article-3.pdf">[IEEE]</a>
            </li>
            <li>
              <strong>The Synchronization Power of Auditable Registers.</strong><br />
              Attiya, H., Del Pozzo, A., Milani, A., Pavloff, U., & Rapetti, A. (2023). 27th International Conference on Principles of Distributed Systems, OPODIS 2023.
              <a href="link-to-article-4.pdf">[IEEE]</a>
            </li>
            <li>
              <strong>Sequential Elimination Voting Games.</strong><br />
              Pavloff, U., Cazenave, T., & Lang, J. (2022). arXiv preprint.
              <a href="link-to-article-5.pdf">[arXiv]</a>
            </li>
          </ul>
        </div>

      </section>

    </div>
  );
}

export default App;
