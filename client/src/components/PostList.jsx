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
        // return (
        //     <div>
        //         <h3>Post title goes here</h3>
        //         <p>
        //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci minus quasi, unde perspiciatis amet rerum eius a hic repudiandae atque beatae, eveniet ullam. Non quibusdam officiis, iusto molestias laborum quo.
        //         </p>
        //         <div>
        //             <LinkPreview url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' width='400px' />;
        //         </div>
        //         <span>Posted by: username @ createdAt time</span>
        //         <span>Number of comments</span>
        //     </div>
        // )
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
                                    {post.username}
                                </Link>{' '}
                                Posted on {post.createdAt}
                            </p>
                            <div className="card-body">
                                <Link to={`/post/${post._id}`}>
                                    <p>{post.postBody}</p>
                                    <p className="mb-0">
                                        {/* Comments: {post.reactionCount} || Click to{' '}
                          {thought.reactionCount ? 'see' : 'start'} the discussion! */}
                                    </p>
                                </Link>
                            </div>
                            <div>
                                <LinkPreview url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' width='400px' />
                            </div>

                        </div>
                    ))}
            </div>
        );
    }
}

export default PostList;