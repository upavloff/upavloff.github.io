import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Grid.css';

// gsap.ticker.useRAF(false);  // Disables requestAnimationFrame

// // Define the interval for GSAP’s animation (optional, default is 60fps)
// gsap.ticker.lagSmoothing(1000, 33);

const WaterDropGrid = ({ setDotRef }) => {
    return (
        <div className="grid">
            <DotGrid setDotRef={setDotRef} />
        </div>
    );
};

// Dynamically calculate the number of rows and columns based on screen size
const calculateGridSize = () => {
    const dotSize = 30; // The size of each dot in pixels
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Calculate how many dots fit in the width and height of the screen
    const numColumns = Math.ceil(screenWidth / dotSize);
    const numRows = Math.ceil(screenHeight / dotSize);

    return { numColumns, numRows };
};

const DotGrid = ({ setDotRef }) => {
    const [gridSize, setGridSize] = useState(calculateGridSize());
    const gridRef = useRef(null);
    let currentDot = null;
    let currentElPos = null;

    useEffect(() => {
        // Update grid size whenever the window is resized
        const handleResize = () => {
            setGridSize(calculateGridSize());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleMouseMove = (e) => {
        const x = e.clientX - currentElPos.x;
        const y = e.clientY - currentElPos.y;

        gsap.to(currentDot, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
        });
    };

    const handleMouseEnter = (e) => {
        const group = e.currentTarget;
        const dot = group.querySelector('.dot-point');
        const rect = group.getBoundingClientRect();
        const elPos = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };
        currentDot = dot;
        currentElPos = elPos;

        gsap.to(dot, {
            opacity: 1,
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
        });

        window.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseLeave = (e) => {
        const group = e.currentTarget;
        const dot = group.querySelector('.dot-point');

        gsap.to(dot, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 0.7,
            duration: 2,
            ease: 'elastic.out(1, 0.3)',
            overwrite: 'auto',
        });

        window.removeEventListener('mousemove', handleMouseMove);
    };

    const handleDotClick = (e) => {
        const targetIndex = parseInt(e.target.dataset.index);
        const gridElements = document.querySelectorAll('.dot-point');

        const targetX = targetIndex % gridSize.numColumns;
        const targetY = Math.floor(targetIndex / gridSize.numColumns);

        const tl = gsap.timeline();

        gridElements.forEach((dot, index) => {
            const dotX = index % gridSize.numColumns;
            const dotY = Math.floor(index / gridSize.numColumns);

            const distance = Math.sqrt(Math.pow(dotX - targetX, 2) + Math.pow(dotY - targetY, 2));

            tl.to(dot, {
                scale: 1.35,
                y: -15,
                backgroundColor: "#1e4ea1",
                duration: 0.25,
                ease: 'power2.out',
            }, distance * 0.1)
                .to(dot, {
                    scale: 1,
                    y: 0,
                    opacity: 0.2,
                    backgroundColor: "#F0F0F0",
                    duration: 2,
                    ease: 'elastic.out(1, 0.3)',
                    overwrite: 'auto',
                }, distance * 0.1 + 0.15);
        });
    };

    const dots = [];
    let index = 0;

    // Generate the grid dynamically based on the number of rows and columns
    for (let i = 0; i < gridSize.numRows; i++) {
        for (let j = 0; j < gridSize.numColumns; j++) {
            let styles = {};
            if (i % 2 === 1) {
                styles.transform = `translateX(15px)`;
            }
            ((index) => {
                dots.push(
                    <div
                        className="group"
                        data-index={index}
                        key={`${i}-${j}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={styles}
                    >
                        <div
                            className="dot-point"
                            data-index={index}
                            style={{ opacity: `0.2` }}
                            ref={(el) => setDotRef(el, index)}
                        />
                    </div>
                );
            })(index);
            index++;
        }
    }

    const gridStyles = {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize.numColumns}, 30px)`,
        gridTemplateRows: `repeat(${gridSize.numRows}, 26px)`,
        gap: '0px',
        justifyContent: 'center',
        alignContent: 'center',
        margin: 'auto',
    };

    return (
        <div
            ref={gridRef}
            onClick={handleDotClick}
            className="gridder"
            style={gridStyles}
        >
            {dots}
        </div>
    );
};

export default WaterDropGrid;
