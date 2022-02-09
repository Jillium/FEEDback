const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  PostBody: {
    type: String,
    required: 'You must include a question, comment, or concern regarding your post. (i.e. "How does my page layout look?" or "I wanted to share my color palette!")'
  },
  name: {
    type: String,
    required: true
    // ref: 'User',
  },
  Comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
}
});

const Post = model("Post", PostSchema);

module.exports = Post;
