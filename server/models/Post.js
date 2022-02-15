const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  postBody: {
    type: String,
    required: 'You must include a question, comment, or concern regarding your post. (i.e. "How does my page layout look?" or "I wanted to share my color palette!")'
  },
  username: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId
  },
  postLink: {
    type: String,
    require: true
  },
  comments: [{
    type: Schema.Types.ObjectId, ref: "Comment"
  }],
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

const Post = model("Post", postSchema);

module.exports = Post;