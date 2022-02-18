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


        <div>
            <span>Posted by {post.username} on {post.createdAt}</span>
            <h3>{post.title}</h3>
            <p>{post.postLink}</p>
            <p>
                {post.postBody}
            </p>
            {post.commentCount > 0 && <CommentList comments={post.comments} />}
            <div>
                <LinkPreview url={post.postLink} width='400px' />
            </div>
           
            
            
            {auth.loggedIn() && <CommentForm postId={post._id} />}
        </div>
    )
};

export default SinglePost;