import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Grid.css';

const WaterDropGrid = () => {
    return (
        <div className="grid">
            <DotGrid />
        </div>
    );
};

const GRID_WIDTH = 25;
const GRID_HEIGHT = 20;

const getCloserNeighbour = (group, elPos, closestNeighbors, maxDistance) => {
    document.querySelectorAll('.group').forEach((neighborGroup) => {
        if (neighborGroup === group) return; // Skip the hovered dot itself

        const neighborDot = neighborGroup.querySelector('.dot-point');
        const neighborRect = neighborGroup.getBoundingClientRect();
        const neighborPos = {
            x: neighborRect.left + neighborRect.width / 2,
            y: neighborRect.top + neighborRect.height / 2,
        };

        // Calculate Euclidean distance
        const distance = Math.sqrt(
            Math.pow(neighborPos.x - elPos.x, 2) + Math.pow(neighborPos.y - elPos.y, 2)
        );

        // Only include neighbors within the specified distance
        if (distance <= maxDistance) {
            closestNeighbors.push({ dot: neighborDot, distance });
        }
    });
};

const DotGrid = () => {
    const gridRef = useRef(null);
    let currentDot = null;
    let currentElPos = null;

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
        currentDot = dot;  //update for magnetic effect
        currentElPos = elPos;

        // Animate the hovered dot-point
        gsap.to(dot, {
            opacity: 1,
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto', // Ensure smooth transition
        });

        // Calculate distance to all other dots and find closest neighbors
        const groupWidth = rect.width;
        const maxDistance = 2 * groupWidth;
        const closestNeighbors = [];

        getCloserNeighbour(group, elPos, closestNeighbors, maxDistance);

        // Animate the closest neighboring dots slightly
        closestNeighbors.forEach((neighbor) => {
            const relativeDistance = neighbor.distance / maxDistance;
            gsap.to(neighbor.dot, {
                opacity: 1 - (0.8 * Math.pow(relativeDistance, 2)),
                scale: 1.2 - (0.2 * relativeDistance),
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto', // Ensure smooth transition
            });
        });

        window.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseLeave = (e) => {
        const group = e.currentTarget;
        const dot = group.querySelector('.dot-point');
        const rect = group.getBoundingClientRect();
        const elPos = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };

        // Restore original opacity and scale for the hovered dot-point
        gsap.to(dot, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 0.5,
            duration: 2,
            ease: 'elastic.out(1, 0.3)',
            overwrite: 'auto',
        });

        // Calculate distance to all other dots and find closest neighbors
        const groupWidth = rect.width;
        const maxDistance = 2 * groupWidth;
        const closestNeighbors = [];

        getCloserNeighbour(group, elPos, closestNeighbors, maxDistance);

        // Restore original opacity and scale for closest neighboring dot-points
        closestNeighbors.forEach((neighbor) => {
            gsap.to(neighbor.dot, {
                opacity: .5,
                scale: 1,
                duration: 2,
                ease: 'elastic.out(1, 0.3)',
                overwrite: 'auto',
            });
        });
        window.removeEventListener('mousemove', handleMouseMove);
    };


    const handleDotClick = (e) => {
        const targetIndex = parseInt(e.target.dataset.index);
        const gridElements = document.querySelectorAll('.dot-point');

        const targetX = targetIndex % GRID_WIDTH;
        const targetY = Math.floor(targetIndex / GRID_WIDTH);

        const tl = gsap.timeline();

        gridElements.forEach((dot, index) => {
            const dotX = index % GRID_WIDTH;
            const dotY = Math.floor(index / GRID_WIDTH);

            // Calculate Euclidean distance
            const distance = Math.sqrt(Math.pow(dotX - targetX, 2) + Math.pow(dotY - targetY, 2));

            tl.to(dot, {
                scale: 1.35,
                y: -15,
                //opacity: 1,
                backgroundColor: "#1e4ea1",
                duration: 0.25,
                ease: 'power2.out',
            }, distance * 0.1) // Delay based on distance
                .to(dot, {
                    scale: 1,
                    y: 0,
                    opacity: 0.5,
                    backgroundColor: "#F0F0F0",
                    duration: 2,
                    ease: 'elastic.out(1, 0.3)',
                    overwrite: 'auto',  //To make waves stop on previous movement put true
                }, distance * 0.1 + 0.15); // Continue the animation after the initial delay
        });
    };

    const dots = [];
    let index = 0;

    for (let i = 0; i < GRID_HEIGHT; i++) {
        for (let j = 0; j < GRID_WIDTH; j++) {
            let styles = {};
            if (i % 2 === 1) {
                styles = { transform: `translateX(15px)` };
            }
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
                    />
                </div>
            );
            index++;
        }
    }

    const gridStyles = {
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_WIDTH}, 30px)`,
        gridTemplateRows: `repeat(${GRID_HEIGHT}, 30px)`,
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

