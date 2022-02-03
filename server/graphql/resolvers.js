import db from '../db/index.js';
import auth from '../utils/auth.js';

const resolvers = {
  Query: {
    books: async (parent, args, context) => {
      console.log(context);
      if (!context.user) throw new Error('Unauthenticated user');
      return await db.models.Book.find({}).populate('author');
    },
  },

  Mutation: {
    login: async (parent, args) => {
      try {
        const author = await db.models.Author.findOne({ name: args.name });

        if (!author) throw new Error('No author found');

        const token = auth.signToken({ _id: author._id, name: author.name });
        console.log(token);

        return { token, author };
      } catch (error) {
        console.log(error);
      }
    }
  }

};

export default resolvers;