import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; // v5
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import MyPosts from './pages/MyPosts';
// import MyPosts from './pages/MyPosts';



function App() {
  const [user, setUser] = useState({ token: '', author: null });
  console.log(user);
  return (
    <Router>
      <div>
        <header className='header'>
          <span><h1>Feedback</h1></span>
          <ul className="nav">
            <li className='nav-item'>
              <Link to="/">Dashboard</Link>
            </li>
            <li className='nav-item'>
              <Link to='/createpost'>Create Post</Link>
            </li>
            <li className='nav-item'>
              <Link to='myposts'>My Posts</Link>
            </li>
            <li className='nav-item'>
              <Link to="/login">Login/Signup</Link>
            </li>
           
          </ul>
        </header>
      </div>

      <Switch>
        <Route exact path="/" render={() => <Dashboard user={user} />} />
        <Route exact path="/login" render={() => <Login setUser={setUser} />} />
        <Route exact path="/createpost" render={() => <CreatePost setUser={setUser} />} />
        <Route exact path="/myposts" render={() => <MyPosts setUser={setUser} />} />
      </Switch>
    </Router>
  );
}

export default App;
