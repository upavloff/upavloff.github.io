import React, { useEffect, useCallback, useRef } from 'react';
import Grid from './Grid';
import { gsap } from 'gsap';
import './App.css';

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

  // Use useEffect to check overlap after mounting
  useEffect(() => {
    // Initial check after component mounts
    checkHexOverlap();

    // Add event listeners for scroll and resize to update the overlap dynamically
    window.addEventListener('scroll', checkHexOverlap);
    window.addEventListener('resize', checkHexOverlap);

    // Cleanup event listeners when component unmounts
    return () => {
      window.removeEventListener('scroll', checkHexOverlap);
      window.removeEventListener('resize', checkHexOverlap);
    };
  }, [checkHexOverlap]); // Include checkHexOverlap in the dependency array

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
        <p>Phd in Computer Science</p>
      </div>
      <Grid setDotRef={(el, index) => (backDivsRef.current[index] = el)} />
    </div>
  );
}

export default App;
