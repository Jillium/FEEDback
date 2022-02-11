const { faker } = require('@faker-js/faker');

const db = require('../config/connection');
const Post = require('../models/Post');
const User = require('../models/User');

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
  console.log(createdUsers);
  // console.log(createdUsers.username)
  // console.log(userData)


  // // create friends
  
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
    // console.log(randomUserIndex);
    const userId = createdUsers.insertedIds[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
      friendId = createdUsers.insertedIds[randomUserIndex];

      
      
    }
    
    const updatedUser = await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
    //console.log(updatedUser)
  }
  

  // create posts


  // let createdPosts = [];
  // for (let i = 0; i < 100; i += 1) {
  //   const PostBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
  //   const { username, _id: userId } = createdUsers[randomUserIndex];

  //   const createdPost = await Post.create({ PostBody, username });

  //   const updatedUser = await User.updateOne(
  //     { _id: userId },
  //     { $push: { posts: createdPost._id } }
  //   );

  //   createdPosts.push(createdPost);
  // }

  // // create reactions
  // for (let i = 0; i < 100; i += 1) {
  //   const CommentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username } = createdUsers.ops[randomUserIndex];

  //   const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
  //   const { _id: postId } = createdPosts[randomPostIndex];

  //   await Post.updateOne(
  //     { _id: postId },
  //     { $push: { comments: { CommentText, username } } },
  //     { runValidators: true }
  //   );
  // }

  console.log('all done!');
  process.exit(0);
});

