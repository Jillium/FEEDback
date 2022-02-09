import './App.css';
import React, { useState } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; // v5
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import MyPosts from './pages/MyPosts';
import Home from "./pages/Home"


const httpLink = createHttpLink({
  uri: '/graphql',
});


const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  const [user, setUser] = useState({ token: '', user: null });
  console.log(user);
  return (
    <ApolloProvider client={client}>
    <Router>
      <div>
        <header className='header'>
          <span><h1>FEEDBACK</h1></span>
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
              <Link to='/myposts'>My Posts</Link>
            </li>
            <li className='nav-item'>
              <Link to="/login">Login/Signup</Link>
            </li>
           
          </ul>
        </header>

        <main>

        </main>

        <footer className="footer">
          <h4>Made by FEEDBACK 2022</h4>
          <ul className='footer-list'>
            <li className='footer-item'>Check us out on <a href="https://github.com/Jillium/FEEDback" target="_blank" rel="noreferrer">Github</a>!</li>
          </ul>
        </footer>
      </div>

      <Switch>
        <Route exact path="/" render={() => <Home user={user} />} />
        <Route exact path="/dashboard" render={() => <Dashboard setUser={setUser} />} />
        <Route exact path="/login" render={() => <Login setUser={setUser} />} />
        <Route exact path="/createpost" render={() => <CreatePost setUser={setUser} />} />
        <Route exact path="/myposts" render={() => <MyPosts setUser={setUser} />} />
      </Switch>
    </Router>
    </ApolloProvider>
  );
}

export default App;
