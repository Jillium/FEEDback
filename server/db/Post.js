import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postBody: {
    type: String,
    required: 'You must include a question, comment, or concern regarding your post. (i.e. "How does my page layout look?" or "I wanted to share my color palette!")'
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  Comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
