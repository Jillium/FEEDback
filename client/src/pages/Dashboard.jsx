import React from 'react';
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
// import PostList from '../components/ThoughtList';
// import ThoughtForm from '../components/ThoughtForm';
// import FriendList from '../components/FriendList';

// import Auth from '../utils/auth';
// import { useQuery } from '@apollo/client';
// import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';

// const Home = () => {
//   const { loading, data } = useQuery(QUERY_THOUGHTS);
//   const { data: userData } = useQuery(QUERY_ME_BASIC);
//   const thoughts = data?.thoughts || [];

//   const loggedIn = Auth.loggedIn();

//   return (
//     <main>
//       <div className="flex-row justify-space-between">
//         {loggedIn && (
//           <div className="col-12 mb-3">
//             <ThoughtForm />
//           </div>
//         )}
//         <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             <ThoughtList
//               thoughts={thoughts}
//               title="Some Feed for Thought(s)..."
//             />
//           )}
//         </div>
//         {loggedIn && userData ? (
//           <div className="col-12 col-lg-3 mb-3">
//             <FriendList
//               username={userData.me.username}
//               friendCount={userData.me.friendCount}
//               friends={userData.me.friends}
//             />
//           </div>
//         ) : null}
//       </div>
//     </main>
//   );
// };

// export default Home;


function Dashboard() {

  return (
    <h1>This is the dashboard</h1>
  )
}

export default Dashboard;