// const db = require('../config/connection');
// const { User, Post } = require('../models');
// const userSeeds = require('./userSeeds.json');
// const postSeeds = require('./postSeeds.json');

// db.once('open', async () => {
//   try {
//     await Post.deleteMany({});
//     await User.deleteMany({});

//     await User.create(userSeeds);

//     for (let i = 0; i < postSeeds.length; i++) {
//       const { _id, postAuthor } = await Post.create(postSeeds[i]);
//       const user = await User.findOneAndUpdate(
//         { username: postAuthor },
//         {
//           $addToSet: {
//             posts: _id,
//           },
//         }
//       );
//     }

//     for (let i = 0; i < commentSeeds.length; i++) {
//       const { _id, commentAuthor } = await Comment.create(commentSeeds[i]);
//       const user = await User.findOneAndUpdate(
//         { username: commentAuthor },
//         {
//           $addToSet: {
//             comments: _id,
//           },
//         }
//       );
//     }

//     for (let i = 0; i < replySeeds.length; i++) {
//       const { _id, replyAuthor } = await Reply.create(replySeeds[i]);
//       const user = await User.findOneAndUpdate(
//         { username: replyAuthor },
//         {
//           $addToSet: {
//             comments: _id,
//           },
//         }
//       );
//     }
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }

//   console.log('all done!');
//   process.exit(0);
// });

const faker = require('faker');

const db = require('../config/connection');
const { Post, User } = require('../models');

db.once('open', async () => {
  await Post.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.username();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create posts
  let createdThoughts = [];
  for (let i = 0; i < 100; i += 1) {
    const postBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdPost = await Post.create({ postBody, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { thoughts: createdPost._id } }
    );

    createdPosts.push(createdPost);
  }

  // // create reactions
  // for (let i = 0; i < 100; i += 1) {
  //   const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username } = createdUsers.ops[randomUserIndex];

  //   const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
  //   const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

  //   await Thought.updateOne(
  //     { _id: thoughtId },
  //     { $push: { reactions: { reactionBody, username } } },
  //     { runValidators: true }
  //   );
  // }

  console.log('all done!');
  process.exit(0);
});