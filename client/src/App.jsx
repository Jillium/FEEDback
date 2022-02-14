import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; // v5
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import MyPosts from './pages/MyPosts';
import Home from "./pages/Home"



function App() {
  const [user, setUser] = useState({ token: '', username: null });
  console.log(user);
  return (
    <Router>
      <div>
        <header className='header'>
          <h1>FEEDBACK</h1>
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
              <Link to='/myposts' style={{ textDecoration: 'none' }}>My Posts</Link>
            </li>
            <li className='nav-item'>
              <Link to="/login" style={{ textDecoration: 'none' }}>Login/Signup</Link>
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
  );
}

export default App;
