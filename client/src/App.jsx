import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; // v5
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import './App.css';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import Home from "./pages/Home"
import logo3 from "../src/assets/Feedback3.png";
import SinglePost from './pages/SinglePost';
import NoMatch from './pages/NoMatch';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './graphql/auth';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const loggedIn = Auth.loggedIn();
  
  return (
    <ApolloProvider client={client}>
    <Router>
      <div>
        <header className='header'>

        <span><img src={logo3} alt="feedback logo" className="logo"></img></span>

          <ul className="nav">
            <li className='nav-item'>
              <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link>
            </li>
            <li className='nav-item'>
              <Link to='/createpost' style={{ textDecoration: 'none' }}>Create Post</Link>
            </li>
            <li className='nav-item'>
              {loggedIn ? (
                <>
                  <Link to="/" onClick={Auth.logout} style={{ textDecoration: 'none' }}>Logout</Link>
                </>
              ) : (
                <>
                  <Link to="/login" style={{ textDecoration: 'none' }}>Login/Signup</Link>
                </>
              )}
            </li>
           
          </ul>
        </header>

        <main className="main-background">

        </main>

        <footer className="footer">
          <h4 className='footer-made-by'>Made by FEEDBACK 2022</h4>
          
          <h4 className='footer-made-by'>Check us out on <a href="https://github.com/Jillium/FEEDback" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'black' }}>Github</a></h4>
          
        </footer>
      </div>

      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/dashboard/:username?" component={Dashboard} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/createpost" render={() => <CreatePost />} />
        <Route exact path="/singlepost/:id" component={SinglePost}  />

        <Route component={NoMatch} />
      </Switch>
    </Router>
    </ApolloProvider>
  );
}

export default App;
