import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; // v5
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import './App.css';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import Home from "./pages/Home"
import logo from "../src/assets/feedback.png";
import logo2 from "../src/assets/Feedback2.png";
import logo3 from "../src/assets/Feedback3.png";
import SinglePost from './pages/SinglePost';

import Auth from './utils/auth';

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
  //const [user, setUser] = useState({ token: '', user: null });
  const loggedIn = Auth.loggedIn();
  //console.log(user);
  //console.log(Auth.getProfile());
  if (loggedIn) {
    console.log('You are in');
    console.log(Auth.getProfile());
  } else {
    console.log('You are still out');
  }
  return (
    <ApolloProvider client={client}>
    <Router>
      <div>
        <header className='header'>
          <span><img src={logo3} alt="feedback logo"></img></span>
          <ul className="nav">
            <li className='nav-item'>
              <Link to="/">Home</Link>
            </li>
            <li className='nav-item'>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className='nav-item'>
              <Link to='/createpost'>Create Post</Link>
            </li>
            <li className='nav-item'>
              {loggedIn ? (
                <>
                  <a href="/" onClick={Auth.logout}>
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <Link to="/login">Login/Signup</Link>
                </>
              )}
            </li>
           
          </ul>
        </header>

        <main className="main-background">

        </main>

        <footer className="footer">
          <h4>Made by FEEDBACK 2022</h4>
          <ul className='footer-list'>
            <li className='footer-item'>Check us out on <a href="https://github.com/Jillium/FEEDback" target="_blank" rel="noreferrer">Github</a>!</li>
          </ul>
        </footer>
      </div>

      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/dashboard/:username?" component={Dashboard} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/createpost" render={() => <CreatePost />} />
        <Route exact path="/singlepost/:id" component={SinglePost}  />
      </Switch>
    </Router>
    </ApolloProvider>
  );
}

export default App;
