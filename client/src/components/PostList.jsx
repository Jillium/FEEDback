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
            <div>

                {posts &&
                    posts.map(post => (
                        <div key={post._id} className="card mb-3">


                            <p className="card-header">
                                <Link
                                    to={`/dashboard/${post.username}`}
                                    style={{ fontWeight: 700 }}
                                    className="text-light"
                                >
                                    Posted by {post.username}
                                </Link>{' '}

                                Posted on {post.createdAt}
                            </p>

                           
                            <div className="card-body">
                                <Link to={`/singlepost/${post._id}`} style={{ fontWeight: 700 }}
                                className="text-light">
                                    <h3>{post.title}</h3>
                                    <p>{post.postBody}</p>
                                    <p className="mb-0">
                                        Comemnts: {post.commentCount} || Click to{' '}
                                        {post.commentCount ? 'see' : 'start'} the discussion!
                                    </p>
                                </Link>
                            </div>

                            <div>
                                <LinkPreview url={post.postLink} width='400px' />
                            </div>

                        </div>
                    ))
                }
            </div >
        );
    }
}

export default PostList;