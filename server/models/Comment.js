const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema({
    commentText: {
      type: String
    },
    username: {
      type: String,
      ref: 'User',
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId, ref: "User"
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// const Comment = model("Comment", commentSchema);

module.exports = commentSchema;

