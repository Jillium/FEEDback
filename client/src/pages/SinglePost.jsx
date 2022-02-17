import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../graphql/queries';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import auth from '../utils/auth';
import CommentForm from '../components/CommentForm';

const SinglePost = props => {
    const { id: postID } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postID }
    });

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>;
    }
    return (


        <div>
            <h3>{post.title}</h3>
            <p>{post.postLink}</p>
            <p>
                {post.postBody}
            </p>
            <div>
                <LinkPreview url={post.postLink} width='400px' />
            </div>
            <p>Posted by {post.username} on {post.createdAt}</p>
            <span>Number of comments</span>
            <h3>Comments will go here</h3>
            <CommentForm postId={post._id} />
        </div>
    )
}

export default SinglePost;