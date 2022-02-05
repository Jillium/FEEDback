import mongoose from 'mongoose';
import User from './User.js';
import Post from './Post.js';
import Comment from './Comment.js';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/graphql_demo');

const db = {
  connection: mongoose.connection,
  models: {
    User,
    Post,
    Comment
  }
};

export default db;
