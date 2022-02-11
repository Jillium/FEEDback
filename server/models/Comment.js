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

  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
}

},
{
  toJSON: {
    virtuals: true
  }
}
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;