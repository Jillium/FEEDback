import React from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { Link } from 'react-router-dom';
// import { QUERY_POSTS } from '../graphql/queries';
import Auth from '../utils/auth';
// import { useQuery } from '@apollo/client';

const PostList = ({ posts }) => {

    // const loggedIn = Auth.loggedIn();

    if (!posts.length) {
        return <h3>No Posts yet</h3>
    } else {


        return (
            <div className="post-card">

                {posts &&
                    posts.map(post => (
                        <div key={post._id} className='card mb-3'>
                            <div className='card mb-0 post-card'>
                                <div className="card-body list-body post-card">
                                    <Link to={`/singlepost/${post._id}`} style={{ fontWeight: 700 }}
                                        className="text-light">
                                        <h3>{post.title}</h3>
                                        <p>{post.postBody}</p>
                                        <p className="mb-0">
                                            Comments: {post.commentCount} || Click to{' '}
                                            {post.commentCount ? 'see' : 'start'} the discussion!
                                        </p>
                                    </Link>
                                </div>

                                <div className="link-preview post-card">
                                    <LinkPreview url={post.postLink} width='400px'
                                        fallbackImageSrc='https://live.staticflickr.com/3238/3039847767_826d72d7a5_c.jpg' />
                                </div>

                                <p className="card-header post-card">
                                    <Link
                                        to={`/dashboard/${post.username}`}
                                        style={{ fontWeight: 700 }}
                                        className="text-light"
                                    >
                                        <p>
                                            Posted by {post.username}
                                        </p>
                                    </Link>{' '}

                                    Posted on {post.createdAt}
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