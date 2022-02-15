import React from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { Link } from 'react-router-dom';
// import { QUERY_POSTS } from '../graphql/queries';
import Auth from '../utils/auth';
// import { useQuery } from '@apollo/client';

const PostList = ({ posts, title }) => {

    // conditionally renders if there are no posts yet 
    // const { loading, data } = useQuery(QUERY_POSTS);
    // const posts = data?.posts || [];

    // const loggedIn = Auth.loggedIn();

    if (!posts.length) {
        return <h3>No Posts yet</h3>
    } else {

        console.log(posts);
        return (
            <div>
                 <h3>{title}</h3>
                {posts &&
                    posts.map(post => (
                        <div key={post._id} className="card mb-3">
                            <Link
                                to={`/singlepost/${post._id}`}
                                style={{ fontWeight: 700 }}
                                className="text-light"
                            >See Discussion</Link>

                            <p className="card-header">
                                <Link
                                    to={`/dashboard/${post.username}`}
                                    style={{ fontWeight: 700 }}
                                    className="text-light"
                                >
                                    {post.username}
                                </Link>{' '}
                                Posted on {post.createdAt}
                            </p>

                            <div className="card-body">
                                <div to={`/post/${post._id}`}>
                                    <p>{post.postBody}</p>
                                    <p className="mb-0">
                                        {/* Comments: {post.reactionCount} || Click to{' '}
                          {thought.reactionCount ? 'see' : 'start'} the discussion! */}
                                    </p>
                                </div>
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