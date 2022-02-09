import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations';

const Login = (props) => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [username, setUsername] = useState('');
  // loginmutation had loading and error in the {} but they were throwing errors so I removed them for the time being 
  const [login, { data }] = useMutation(LOGIN_MUTATION);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect((props) => {
    if (data && data.login) {
      props.setUser({ token: data.login.token, user: data.login.user });
    }
  }, [data]);
  
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
                Login
              </button>
            </form>

      
    </div>
  );
};

export default Login;
