import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  posts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  comments: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }
});


const User = mongoose.model('User', UserSchema);

export default User; 
