import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

// import ThoughtForm from '../components/ThoughtForm';
import PostList from '../components/PostList';
import FriendList from '../components/FriendList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../graphql/queries';
import { ADD_FRIEND } from '../graphql/mutations';
import Auth from '../graphql/auth';

const Dashboard = (props) => {
  const { username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || data?.user || {};

  console.log(user);

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/dashboard/:username?" />;
  }

  if (loading) {
    return <div>Loading. One Moment, Please...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Please log in or sign up with a new account.
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Dashboard
        </h2>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <PostList
            posts={user.posts}
            title={`${user.username}'s thoughts...`}
          />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam}</div>
    </div>
  );
};

export default Dashboard;


// function Dashboard() {

// //   const { loading, data } = useQuery(QUERY_POSTS);
// //   const [addFriend] = useMutation(ADD_FRIEND);

// //   const posts = data?.posts || [];
// //   console.log(posts);
  

//   return (
//     <>
//     <h1>This is the dashboard</h1>
//     <h2>These are your posts</h2>
//     <h2>This is your friends list</h2>
//     {/* <PostList 
//     posts={user.posts}/>
//     <FriendList 
//     username={user.username}
//     friends={user.friends}/> */}
//     </>
//   )
// }

// export default Dashboard;