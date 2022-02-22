import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../graphql/queries';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import auth from '../utils/auth';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const SinglePost = props => {
    const { id: postID } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postID }
    });

    const post = data?.post || {};
    console.log(post);
    console.log(post.comments)
    console.log(post.title)
    console.log(post.username)

    if (loading) {
        return <div>Loading...</div>;
    }
    return (


        <div className="single-post-container main-background">
            <div className="single-post-card">

                <h3 className='main-header-font'>{post.title}</h3>
                {/* <p className='description-p'>{post.postLink}</p> */}
                <p className='description-p'>
                    {post.postBody}
                </p>

                <div>
                    <p className='comment-p'>
                        {post.commentCount > 0 && <CommentList comments={post.comments} />}
                    </p>
                </div>
                <div>
                    <LinkPreview url={post.postLink} width='300px' height='300px' fallbackImageSrc='https://live.staticflickr.com/3238/3039847767_826d72d7a5_c.jpg' />
                </div>


                <div>
                    <span>Posted by {post.username} on {post.createdAt}</span>
                </div>

                {auth.loggedIn() && <CommentForm postId={post._id} />}

            </div>
        </div>
    )
};

export default SinglePost;