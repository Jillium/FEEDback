import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME_BASIC } from "../graphql/queries";
import PostList from '../components/PostList';



function Home() {

  const { loading, data } = useQuery(QUERY_POSTS);
  // const { data: userData } = useQuery(QUERY_ME_BASIC);


  const posts = data?.posts || [];



  return (
    <main className="padding-top">

      <h2 className="bg-dark text-secondary p-3 display-inline-block">
        Home
      </h2>

      <div className='main-background'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className='home-list-container'>
            <PostList posts={posts} />
          </div>
        )}
      </div>
    </main>
  );


};

export default Home;