import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  commentText: {
    type: String
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  Post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;