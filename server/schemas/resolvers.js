const db = require('../models/index');
const auth = require('../utils/auth');
const { Post, User } = require ("../models");


const resolvers = {
  Query: {
    posts: async (parent, args, context) => {
      console.log(context);
      if (!context.user) throw new Error('Unauthenticated user');
      return await db.models.Post.find({}).populate('User');
    },
  },

  Mutation: {
    login: async (parent, args) => {
      try {
        const user = await db.models.User.findOne({ name: args.name });

        if (!user) throw new Error('No user found');

        const token = auth.signToken({ _id: user._id, name: user.name });
        console.log(token);

        return { token, user };
      } catch (error) {
        console.log(error);
      }
    }
  }

};

module.export = resolvers;