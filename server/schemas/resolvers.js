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
    addUser: async (parent, args) => {
      const user = await User.create(args);
      // const token = signToken(user);
      // return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

    
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      // const token = signToken(user);
      return user;
    },

    addPost: async (parent, args)  => {
      if (args) {
        const post = await Post.create({ ...args, username: username, postBody: postBody, postLink: postLink });

        await User.findByIdAndUpdate(
          { _id: _id },
          { $push: { posts: post._id } },
          { new: true }
        );

        return post;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
   
    // addPost: async (parent, args, context) => {
    //   if (context.user) {
    //     const post = await Post.create({ ...args, username: context.user.username, postBody: context.user.postBody, postLink: context.user.postLink });

    //     await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { posts: post._id } },
    //       { new: true }
    //     );

    //     return post;
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
  }


  


    
   
};

module.exports = resolvers;