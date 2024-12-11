import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './PostContent.css';

function PostContent() {
    const { postName } = useParams(); // Extract post name from the URL
    const location = useLocation(); // Access state passed via Link
    const embedUrl = location.state?.embedUrl; // Retrieve the embedUrl from state
    console.log(embedUrl)

    if (!embedUrl) {
        return <div>Post content not available!</div>;
    }

    return (
        <div className="post-content">
            <iframe
                src={embedUrl}
                title={postName}
                width="100%"
                height="100%"
                style={{ border: 'none', minHeight: '100vh' }}
            ></iframe>
        </div>
    );
}

export default PostContent;
