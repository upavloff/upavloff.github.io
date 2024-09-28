import React from 'react';
import './Posts.css'; // Custom CSS for posts
import imageSnarkFormula from './assets/snarkForumla.png';
import imageSnarkCircuit from './assets/snarkCircuit.png';
import imageStark from './assets/stark.png';
import imageIntroSNARK from './assets/introSNARK.png';
import imageConsensusLayer from './assets/consensus_layer.webp';
import imageExecutionLayer from './assets/execution_layer.webp';
import imageIntroRandomness from './assets/intro_randomness.webp';

const posts = [
    {
        title: 'zk-SNARK Construction - Part 2 (WIP)',
        image: imageSnarkFormula,
        link: 'https://hackmd.io/@your-username/third-post',
    },
    {
        title: 'zk-SNARK Construction - Part 1 (WIP)',
        image: imageSnarkCircuit,//'https://i.imgur.com/3oV4CmD.png',
        link: 'https://hackmd.io/@your-username/third-post',
    },
    {
        title: 'STARK from the bottom',
        image: imageStark, // Preview image for this post
        link: 'https://hackmd.io/@upavloff/ry6EWIXdj',
    },
    {
        title: 'Introduction to Zero-Knowledge Proofs',
        image: imageIntroSNARK,
        link: 'https://hackmd.io/@upavloff/ryHfMRMIs',
    },
    {
        title: 'Randomness in Ethereum - Consensus Layer',
        image: imageConsensusLayer,
        link: 'https://nodeguardians.io/adventure/consensus-randao/part-1',
    },
    {
        title: 'Randomness in Ethereum - Execution Layer',
        image: imageExecutionLayer,
        link: 'https://nodeguardians.io/adventure/vrf/part-1',
    },
    {
        title: 'Introduction to Randomness',
        image: imageIntroRandomness,
        link: 'https://nodeguardians.io/adventure/introduction-randomness/part-1',
    },
];

function Posts() {
    return (
        <div className="posts-list">
            {posts.map((post, index) => {
                const domain = new URL(post.link).hostname.replace('www.', ''); // Extract domain name

                return (
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                        <div className="post-item" key={index}>
                            <div className="post-image-container">
                                <img src={post.image} alt={post.title} className="post-image" />
                                <div className="post-overlay">{domain}</div> {/* Automatically fill the domain */}
                            </div>
                            <h3 className="post-title">{post.title}</h3>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}

export default Posts;
