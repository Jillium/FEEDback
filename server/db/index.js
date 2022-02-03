import mongoose from 'mongoose';
import Author from './Author.js';
import Book from './Book.js';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/graphql_demo');

const db = {
  connection: mongoose.connection,
  models: {
    Author,
    Book,
  }
};

export default db;
