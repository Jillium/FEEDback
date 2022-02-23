import React from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {

    if (!posts.length) {
        return <h3>No Posts yet</h3>
    } else {
        return (
            <div className="post-card">
                {posts &&
                    posts.map(post => (
                        <div key={post._id} className='card mb-3'>
                            <div className='card mb-0'>
                                <div className="card-body list-body">
                                    <Link to={`/singlepost/${post._id}`} style={{ fontWeight: 700 }}
                                        className="text-light">
                                        <h3>{post.title}</h3>
                                        <p >{post.postBody}</p>
                                        <p className="mb-0">
                                            Comments: {post.commentCount} || Click to{' '}
                                            {post.commentCount ? 'see' : 'start'} the discussion!
                                        </p>
                                    </Link>
                                </div>

                                <div className="link-preview post-card">
                                    <a href={post.postLink}>{post.postLink}</a>
                                    <LinkPreview url={post.postLink} width='300px' height='300px' descriptionLength={0}
                                        fallbackImageSrc='https://live.staticflickr.com/3238/3039847767_826d72d7a5_c.jpg' />
                                </div>

                                <p className="card-header">
                                    <Link
                                        to={`/dashboard/${post.username}`}
                                        style={{ fontWeight: 700 }}
                                        className="text-light"
                                    >
                                            Posted by {post.username}, Posted on {post.createdAt}
                                    </Link>{' '}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div >
        );
    }
}

export default PostList;