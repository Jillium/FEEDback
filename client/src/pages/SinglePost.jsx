import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST } from '../graphql/queries';
import { REMOVE_POST } from '../graphql/mutations';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import auth from '../graphql/auth';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const SinglePost = props => {
    const { id } = useParams();

    const [removePost] = useMutation(REMOVE_POST);
    const { loading, data } = useQuery(
        QUERY_POST, {
        variables: { _id: id }
    }
    );

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleClick = async () => {
        console.log("clicked");
        await removePost({
            variables: { postId: id },
        });

        window.location.replace("/dashboard")
    };

    return (


        <div className="single-post-container main-background">
            <div className="single-post-card">

                <h3 className='main-header-font'>{post.title}</h3>
                <p className='description-p'>
                    {post.postBody}
                </p>

                <div>
                    <LinkPreview url={post.postLink} width='300px' height='300px' fallbackImageSrc='https://live.staticflickr.com/3238/3039847767_826d72d7a5_c.jpg' />
                </div>

                <div>
                    {auth.loggedIn() && auth.getProfile().data.username === post.username && (
                        <button className="btn btn-secondary ml-auto m-1 mt-4" onClick={handleClick}>Delete This Post</button>
                    )}
                </div>

                <div>
                    <p className='comment-p'>
                        {post.commentCount > 0 && <CommentList comments={post.comments} />}
                    </p>
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