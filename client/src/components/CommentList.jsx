
import React from 'react';
import { useParams } from 'react-router-dom';
import { REMOVE_COMMENT } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import auth from '../graphql/auth';

const CommentList = ({ comments }) => {

  const { id } = useParams();

  const [removeComment] = useMutation(REMOVE_COMMENT);

  const handleDelete = async (commentId) => {
    await removeComment({
      variables: {
        postId: id,
        commentId
      }
    })
    window.location.reload();
  }
    
    return (
      <div>
        <div>
          <span className= "header-font">Comments</span>
        </div>
        <div>
          {comments &&
            comments.map(comment => (
              <div key={comment._id}>
                {comment.commentText} {'// '}
                  {comment.username} on {comment.createdAt}
                  {auth.loggedIn() && auth.getProfile().data.username === comment.username && (
                  <a onClick={() =>handleDelete(comment._id)}>Delete</a>
                  )}
              </div>
            ))}
        </div>
      </div>       
    );
};

export default CommentList;