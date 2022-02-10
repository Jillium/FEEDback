import React from 'react';

const SinglePost = ({ posts, title }) => {

    return (
        

        <div>
            <h1>Single Post Page</h1>
            <h3>Post title goes here</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci minus quasi, unde perspiciatis amet rerum eius a hic repudiandae atque beatae, eveniet ullam. Non quibusdam officiis, iusto molestias laborum quo.
            </p>
            <span>Posted by: username @ createdAt time</span>
            <span>Number of comments</span>
            <h3>Comments will go here</h3>
            {/* nest comments  */}
        </div>
    )
}

export default SinglePost;