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


function Dashboard() {

  return (
    <h1>This is the dashboard</h1>
  )
}

export default Dashboard;