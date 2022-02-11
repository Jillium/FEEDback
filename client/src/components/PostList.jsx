import React from 'react';

const PostList = ({ posts, title }) => {

    // conditionally renders if there are no posts yet 

    if (!posts.length) {
        return <h3>No Posts yet</h3>
    }

    return (
        <div>
            <h3>Post title goes here</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci minus quasi, unde perspiciatis amet rerum eius a hic repudiandae atque beatae, eveniet ullam. Non quibusdam officiis, iusto molestias laborum quo.
            </p>
            <span>Posted by: username @ createdAt time</span>
            <span>Number of comments</span>
        </div>
    )
}

export default PostList;