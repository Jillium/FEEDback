const { faker } = require('@faker-js/faker');

const db = require('../config/connection');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

db.once('open', async () => {
  await Post.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }
  
  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
    const userId = createdUsers.insertedIds[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
      friendId = createdUsers.insertedIds[randomUserIndex];
    }
    
    const updatedUser = await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create posts

  let createdPosts = [];
  for (let i = 0; i < 100; i += 1) {
    const postBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const title = faker.lorem.words(Math.round(Math.random() * 2) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
    const userId = createdUsers.insertedIds[randomUserIndex];

    const createdPost = await Post.create({ title, postBody, userId });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { posts: createdPost._id } }
    );

    createdPosts.push(createdPost);
  }

  // create comments

  let createdComments = [];
  for (let i = 0; i < 100; i += 1) {
    const username = faker.internet.userName();
    const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
    const userId = createdUsers.insertedIds[randomUserIndex];

    const createdComment = await Comment.create({ commentText, username, userId });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { comments: createdComment._id } }
    );

    createdComments.push(createdComment);
  }

  console.log('all done!');
  process.exit(0);
});

