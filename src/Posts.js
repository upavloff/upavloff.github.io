import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import './Posts.css';
import { FaThLarge, FaList } from 'react-icons/fa';

import imageSnarkFormula from './assets/snarkForumla.png';
import imageSnarkCircuit from './assets/snarkCircuit.png';
import imageStark from './assets/stark.png';
import imageIntroSNARK from './assets/introSNARK.png';
import imageConsensusLayer from './assets/consensus_layer.webp';
import imageExecutionLayer from './assets/execution_layer.webp';
import imageIntroRandomness from './assets/intro_randomness.webp';

const posts = [
    {
        title: 'zk-SNARK Construction - Part 2',
        image: imageSnarkFormula,
        link: 'https://hackmd.io/@upavloff/Byqn_Ii8n',
        publishedDate: '2024-11-03',
    },
    {
        title: 'zk-SNARK Construction - Part 1',
        image: imageSnarkCircuit,//'https://i.imgur.com/3oV4CmD.png',
        link: 'https://hackmd.io/@upavloff/H1BSKz0Ai',
        // link: '/posts/zk-snark-construction-part-1.html',
        publishedDate: '2024-06-04',
    },
    {
        title: 'STARK from the bottom',
        image: imageStark, // Preview image for this post
        link: 'https://hackmd.io/@upavloff/ry6EWIXdj',
        publishedDate: '2023-02-25',
    },
    {
        title: 'Introduction to Zero-Knowledge Proofs',
        image: imageIntroSNARK,
        link: 'https://hackmd.io/@upavloff/ryHfMRMIs',
        publishedDate: '2023-02-01',
    },
    {
        title: 'Randomness in Ethereum - Consensus Layer',
        image: imageConsensusLayer,
        link: 'https://nodeguardians.io/adventure/consensus-randao/part-1',
        publishedDate: '2022-10-28',
    },
    {
        title: 'Randomness in Ethereum - Execution Layer',
        image: imageExecutionLayer,
        link: 'https://nodeguardians.io/adventure/vrf/part-1',
        publishedDate: '2022-10-01',
    },
    {
        title: 'Introduction to Randomness',
        image: imageIntroRandomness,
        link: 'https://nodeguardians.io/adventure/introduction-randomness/part-1',
        publishedDate: '2022-09-13',
    },
];

const generateSlug = (title) => {
    return title
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Ensure no multiple consecutive hyphens
};

function Posts() {

    const [viewMode, setViewMode] = useState(() => {
        return localStorage.getItem('viewMode') || 'list'; // Default to 'list' if not set
    });

    // Save to localStorage whenever the viewMode changes
    useEffect(() => {
        localStorage.setItem('viewMode', viewMode);
    }, [viewMode]);

    return (
        <div className="posts-page">
            {/* Toggle Button */}
            <div className="view-toggle">
                <button
                    className={`toggle-icon ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                >
                    <FaList />
                </button>
                <button
                    className={`toggle-icon ${viewMode === 'image' ? 'active' : ''}`}
                    onClick={() => setViewMode('image')}
                >
                    <FaThLarge />
                </button>
            </div>

            {/* Conditional Rendering */}
            {viewMode === 'image' ? (
                <div className="posts-card">
                    {posts.map((post, index) => {
                        const domain = (() => {
                            try {
                                return new URL(post.link).hostname.replace('www.', ''); // Extract domain name
                            } catch (error) {
                                return 'here'; // Fallback if no valid URL
                            }
                        })();
                        const slug = generateSlug(post.title);

                        return (
                            <a
                                href={post.link} // Navigate to the external URL
                                target="_blank" // Open in a new tab
                                rel="noopener noreferrer" // Improve security
                                key={slug} // Unique key for React rendering
                                className="post-item"
                            >
                                <div className="post-image-container">
                                    <img src={post.image} alt={post.title} className="post-image" />
                                    <div className="post-overlay">{domain}</div>
                                </div>
                                <h3 className="post-title">{post.title}</h3>
                            </a>
                            // <Link
                            //     to={`${slug}`}
                            //     state={{ embedUrl: post.link }}
                            //     key={slug}
                            //     className="post-item"
                            // >
                            //     <div className="post-image-container">
                            //         <img src={post.image} alt={post.title} className="post-image" />
                            //         <div className="post-overlay">{domain}</div>
                            //     </div>
                            //     <h3 className="post-title">{post.title}</h3>
                            // </Link>
                        );
                    })}
                </div>) : (

                <div className="posts-line">
                    {posts.map((post, index) => {

                        const slug = generateSlug(post.title);
                        console.log(slug);
                        return (
                            <a
                                href={post.link} // Navigate to the external URL
                                target="_blank" // Open in a new tab
                                rel="noopener noreferrer" // Improve security
                                key={slug} // Unique key for React rendering
                                className={`post-line ${index % 2 === 0 ? 'even' : 'odd'}`}
                            >
                                <div className="post-title">{post.title}</div>
                                <div className="post-date">
                                    {new Date(post.publishedDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit',
                                    })}
                                </div>
                            </a>

                            // <Link
                            //     to={`${slug}`}
                            //     state={{ embedUrl: post.link }}
                            //     key={slug}
                            //     className={`post-line ${index % 2 === 0 ? 'even' : 'odd'}`}
                            // >
                            //     <div className="post-title">{post.title}</div>
                            //     <div className="post-date">
                            //         {new Date(post.publishedDate).toLocaleDateString(undefined, {
                            //             year: 'numeric',
                            //             month: 'short',
                            //             day: '2-digit',
                            //         })}
                            //     </div>
                            // </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Posts;
