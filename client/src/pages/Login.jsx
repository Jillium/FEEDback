import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations';

const Login = (props) => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [loginUsername, setLoginUsername] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  // loginmutation had loading and error in the {} but they were throwing errors so I removed them for the time being 
  const [login, { loginData }] = useMutation(LOGIN_MUTATION);
  const [addUser, { signUpData }] = useMutation(LOGIN_MUTATION);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect((props) => {
    if (loginData && loginData.login) {
      props.setUser({ token: loginData.login.token, user: loginData.login.user });
    }
  }, [loginData]);
  
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        login({ variables: { name: username } });
      }}>
        <label htmlFor="username">
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <button>Login</button>
      </form>

      <form onSubmit={(e) => {
        e.preventDefault();
        login({ variables: { name: username } });
      }}>
              <h3 className='form-title'>Login</h3>
              <label htmlFor="login-username">
                Username:
              </label>
              <input
                className="form-input"
                placeholder="Your Username"
                name="login-username"
                type="text"
                id="login-username"
                value={formState.username}
                onChange={handleChange}
              />
              <label htmlFor="login-password">
                Password:
              </label>
              <input
                className="form-input"
                placeholder="******"
                name="login-password"
                type="password"
                id="login-password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Login
              </button>
      </form>

      <form onSubmit={(e) => {
        e.preventDefault();
        addUser({ variables: { name: username } });
      }}>
              <h3 className='form-title'>Sign-Up</h3>
              <label htmlFor="username">
                Username:
              </label>
              <input
                className="form-input"
                placeholder="Your Username"
                name="username"
                type="text"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <label htmlFor="email">
                Email:
              </label>
              <input
                className="form-input"
                placeholder="Your Email"
                name="email"
                type="text"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <label htmlFor="password">
                Password:
              </label>
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                SignUp
              </button>
      </form>

      
    </div>
  );
};

export default Login;
