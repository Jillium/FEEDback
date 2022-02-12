const db = require('../models/index');
const auth = require('../utils/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    // get all posts
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    // get a post by id
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        // .populate('friends')
        // .poppulate('posts')
    },
    // get a user by username 
    user: async (parent, { username }) => {
      return User.findOne({ username })
      .select("-__v -password")
      // .populate('friends')
      // .populate('posts')
    }
  }, 
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // Check if username is used #TBU
      const previousUsername = await User.findOne({ username });
      if (previousUsername) {
        throw new AuthenticationError('Existed User');
      }
      // Check if email is used #TBU
      const previousEmail = await User.findOne({ email });
      if (previousEmail) {
        throw new AuthenticationError('Existed Email'); 
      }
      // Create User
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      // Check if the username is wrong #TBU
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      // Check if the password is wrong #TBU
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const token = signToken(user);
      return { token, user };
    },

    addPost: async (parent, args)  => {
        
        const post = await Post.create({ ...args });

        await User.findOneAndUpdate(
          
          { $push: { posts: post._id } },
          { new: true }
        );

        return post;
        

      
    },

   

  addComment: async (parent, { postId, commentText }) => {
    
        const updatedPost = await Post.findOneAndUpdate(
            
            { $push: { comments: { commentText } } },
            { new: true, runValidators: true }
        );
        return updatedPost;
    
    
}
  
  }

    
   
};

module.exports = resolvers;