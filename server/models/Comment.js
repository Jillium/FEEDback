const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema({
  commentText: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  // Commenting out because we aren't doing comment replies right now
  // Replies: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Reply'
  // }],
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
}
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;