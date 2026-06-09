import React, { useEffect, useState } from 'react';
import './Posts.css';
import { FaThLarge, FaList } from 'react-icons/fa';

const talks = [
    {
        title: "Incentive Compatibility of Ethereum's PoS - IC3 2026",
        image: '/talks/IC3_presentation-thumbnail.png',
        link: '/talks/IC3_presentation.pdf',
        presentedDate: '2026-06-06',
    },
];

const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

function Talks() {
    const [viewMode, setViewMode] = useState(() => {
        return localStorage.getItem('talksViewMode') || 'list';
    });

    useEffect(() => {
        localStorage.setItem('talksViewMode', viewMode);
    }, [viewMode]);

    return (
        <div className="posts-page">
            <div className="view-toggle">
                <button
                    className={`toggle-icon ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="Show talks as a list"
                >
                    <FaList />
                </button>
                <button
                    className={`toggle-icon ${viewMode === 'image' ? 'active' : ''}`}
                    onClick={() => setViewMode('image')}
                    aria-label="Show talks as vignettes"
                >
                    <FaThLarge />
                </button>
            </div>

            {viewMode === 'image' ? (
                <div className="posts-card">
                    {talks.map((talk) => {
                        const slug = generateSlug(talk.title);

                        return (
                            <a
                                href={talk.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={slug}
                                className="post-item"
                            >
                                <div className="post-image-container">
                                    <img src={talk.image} alt={talk.title} className="post-image" />
                                    <div className="post-overlay">PDF</div>
                                </div>
                                <h3 className="post-title">{talk.title}</h3>
                            </a>
                        );
                    })}
                </div>
            ) : (
                <div className="posts-line">
                    {talks.map((talk, index) => {
                        const slug = generateSlug(talk.title);

                        return (
                            <a
                                href={talk.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={slug}
                                className={`post-line ${index % 2 === 0 ? 'even' : 'odd'}`}
                            >
                                <div className="post-title">{talk.title}</div>
                                <div className="post-date">
                                    {new Date(talk.presentedDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit',
                                    })}
                                </div>
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Talks;
