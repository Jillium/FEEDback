
import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
    
    return (
        <div>
        <div>
          <span className= "header-font">Comments</span>
        </div>
        <div>
          {comments &&
            comments.map(comment => (
              <p key={comment._id}>
                {comment.commentText} {'// '}
                {/* <Link to={`dashboard/${comment.username}`}> */}
                  {comment.username} on {comment.createdAt}
                {/* </Link> */}
              </p>
            ))}
        </div>
      </div>
      
       
    );
};

export default CommentList;