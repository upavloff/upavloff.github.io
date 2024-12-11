import React, { useState } from 'react';
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

function Posts() {
    const [viewMode, setViewMode] = useState('image'); // Default to image view

    return (
        <div className="posts-page">
            {/* Toggle Button */}
            <div className="view-toggle">
                <button
                    className={`toggle-icon ${viewMode === 'image' ? 'active' : ''}`}
                    onClick={() => setViewMode('image')}
                >
                    <FaThLarge />
                </button>
                <button
                    className={`toggle-icon ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                >
                    <FaList />
                </button>
            </div>

            {/* Conditional Rendering */}
            {viewMode === 'image' ? (
                <div className="posts-list">
                    {posts.map((post, index) => {
                        const domain = new URL(post.link).hostname.replace('www.', ''); // Extract domain name

                        return (
                            <a
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={index} // Key moved to the outermost element
                            >
                                <div className="post-item">
                                    <div className="post-image-container">
                                        <img src={post.image} alt={post.title} className="post-image" />
                                        <div className="post-overlay">{domain}</div> {/* Automatically fill the domain */}
                                    </div>
                                    <h3 className="post-title">{post.title}</h3>
                                </div>
                            </a>
                        );
                    })}
                </div>) : (
                <div className="posts-list-line">
                    {posts.map((post, index) => (
                        <a
                            key={post.title}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`post-line ${index % 2 === 0 ? 'even' : 'odd'}`}
                        >
                            <div className="post-title">{post.title}</div>
                            <div className="post-date">{new Date(post.publishedDate).toLocaleDateString()}</div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Posts;
