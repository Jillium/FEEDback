import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

// import ThoughtForm from '../components/ThoughtForm';
import PostList from '../components/PostList';
import FriendList from '../components/FriendList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../graphql/queries';
import { ADD_FRIEND } from '../graphql/mutations';
import Auth from '../graphql/auth';

const Dashboard = (props) => {
  const { username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery((!userParam) ? QUERY_ME : QUERY_USER, {variables: { username: userParam }});

  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/dashboard" />;
  }

  if (loading) {
    return <div>Loading. One Moment, Please...</div>;
  }

  const loggedIn = Auth.loggedIn();
  if (!loggedIn) {
      return <Redirect to="/login" />;
  }

  const handleClick = async () => {
    console.log("clicked", user);
    await addFriend({
      variables: { friendId: user._id },
    });
  };

  return (
    <div className="dashboard-container main-background">
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Dashboard
        </h2>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Follow
          </button>
        )}
      </div>

      <div className ="dashboard-post-container">
        <div className="dashboard-list">
          <div className="flex-row justify-space-between mb-3">
            <PostList
              posts={user.posts}
              title={`${user.username}'s thoughts...`}
            />
          </div>
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
        <div className="mb-3">{!userParam}</div>

      </div>
    </div>
  );
};

export default Dashboard;
