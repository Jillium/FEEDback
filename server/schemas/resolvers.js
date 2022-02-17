const db = require('../models/index');
const auth = require('../utils/auth');
const { User, Post } = require('../models')
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    me: async ( parent,args, context) => {
      console.log(context.user);
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__V -password')
          .populate("posts")
          .populate('friends')

          return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    // get all post by username
    allPosts: async () => {
      return Post.find().sort({ createdAt: -1 })
        .populate("comments");
    },
    // get all post by username
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 }).populate("comments");
    },
    // get a post by id
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate('friends')
        .populate('posts');
    },
    // get a user by username 
    user: async (parent, { username }) => {
      return User.findOne({ username })
      .select("-__v -password")
      // .populate('friends')
      .populate('posts')
    }
  }, 
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // Check if username is used #TBU
      const previousUsername = await User.findOne({ username });
      if (previousUsername) {
        throw new AuthenticationError('The username has been already registered!');
      }
      // Check if email is used #TBU
      const previousEmail = await User.findOne({ email });
      if (previousEmail) {
        throw new AuthenticationError('The email has been already registered!');
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
        throw new AuthenticationError('Incorrect Credentials');
      }
      // Check if the password is wrong #TBU
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect Credentials');
      }
      
      const token = signToken(user);
      
      return { token, user };
    },

    addPost: async (parent, { username, title, postBody, postLink })  => {
      if (username == '') {
        throw new AuthenticationError('You are not logged in');
      } else {
        const user = await User.findOne({ username });
        if (user) {
          const ID = user._id;
          const post = await Post.create({ title, postBody, postLink, username, ID });
          await User.findOneAndUpdate(
            { username : username },
            { $push: { posts: post._id } },
            { new: true }
          );

          return post; 
        } else {
          throw new AuthenticationError('User not found! Either you are in trouble or I am in trouble');
        }
      }
    },

    addComment: async (parent, { postId, commentText, username }) => {
    
      const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { comments: { commentText, username } } },
          { new: true, runValidators: true }
      );
      return updatedPost;
    }
  
  }

    
   
};

module.exports = resolvers;