import React from 'react';
import './Posts.css'; // Custom CSS for posts
import imageStark from './assets/stark.png';
import imageIntroSNARK from './assets/introSNARK.png';

const posts = [
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
        title: 'SNARK construction part 1 (TO DO)',
        image: 'path-to-your-image-3.jpg',
        link: 'https://hackmd.io/@your-username/third-post',
    },
];

function Posts() {
    return (
        <div className="posts-list">
            {posts.map((post, index) => (
                <div className="post-item" key={index}>
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                        <img src={post.image} alt={post.title} className="post-image" />
                        <h3 className="post-title">{post.title}</h3>
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Posts;
