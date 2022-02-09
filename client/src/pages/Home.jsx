import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from "../graphql/queries";


function Home() {

    const { loading, data } = useQuery(QUERY_POSTS);

    const posts = data?.posts || [];
    console.log(posts);


    return (
        <main>
            <div>
                <div>{/* print post list */}</div>
                <h1>This is the homepage</h1>
            </div>
        </main>
    );


};

export default Home;