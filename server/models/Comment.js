const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const CommentSchema = new Schema({
  CommentText: {
    type: String
  },
  CommentedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  Post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  Replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Reply'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
}
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;