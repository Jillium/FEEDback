// import React from 'react';
// import { Redirect } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_BOOKS } from '../graphql/queries';

// books query will not be needed, but saving it to help set up post functionality. 
// const Dashboard = (props) => {
//   const { data, loading, error } = useQuery(QUERY_BOOKS, {
//     context: {
//       headers: {
//         'Authorization': `Bearer ${props.user.token}`
//       },
//     },
//     fetchPolicy: 'no-cache'
//   });

//   if (error) {
//     return <Redirect to={"/login"} />
//   }

//   return (
//     <div>
//       <div>{loading ? <div>Loading...</div> : data?.books.map((book, index) =><div key={`book-${index}`}>{book.title}</div>)}</div>
//     </div>
//   );
// };

// export default Dashboard;

// import React from 'react';
// import PostList from '../components/PostListList';
// import FriendList from '../components/FriendList';
// import { Redirect, useParams } from 'react-router-dom';

// import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';

// import { useQuery, useMutation } from '@apollo/client';
// import { QUERY_USER, QUERY_ME } from '../utils/queries';
// import { ADD_FRIEND } from '../utils/mutations';
// import Auth from '../utils/auth';

// import Auth from '../utils/auth';
// import { useQuery } from '@apollo/client';
// import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';



function Dashboard() {

  // const { loading, data } = useQuery(QUERY_POSTS);
  // const [addFriend, { error }] = useMutation(ADD_FRIEND);

  // const posts = data?.posts || [];
  // console.log(posts);

  return (
    <>
    <h1>This is the dashboard</h1>
    {/* <PostList posts={posts}/>
    <FriendList friends={friends}/> */}
    </>
  )
}

export default Dashboard;