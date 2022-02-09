import React from 'react';

const PostList = ({ posts, title }) => {
    if (!posts.length) {
        return <h3>No Posts yet</h3>
    }

    return (
        <div>
            <h3>Posts go here </h3>
        </div>
    )
}

export default PostList;