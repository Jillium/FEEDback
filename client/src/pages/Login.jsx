import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_MUTATION } from '../graphql/mutations';

//import Auth from '../utils/auth';

const Login = (props) => {
  const [loginFormState, setLoginFormState] = useState({ username: '', password: '' });
  const [signUpFormState, setSignUpFormState] = useState({ username: '', email: '', password: '' });
  // loginmutation had loading and error in the {} but they were throwing errors so I removed them for the time being
  const [login, { loginData }] = useMutation(LOGIN_MUTATION);
  const [addUser, { signUpData }] = useMutation(ADD_USER);

  // update state based on login form input changes
  const handleLoginFormChange = (event) => {
    const { name, value } = event.target;
    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  // update state based on sign up form input changes
  const handleSignUpFormChange = (event) => {
    const { name, value } = event.target;
    setSignUpFormState({
      ...signUpFormState,
      [name]: value,
    });
  };

  // submit login form
  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // const { data } = await login({
      //   variables: { ...loginFormState },
      // });
      console.log({
          variables: { ...loginFormState },
        });
      //Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setLoginFormState({
      username: '',
      password: ''
    });
  };

  // submit sign up form
  const handleSignUpFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // const { data } = await addUser({
      //   variables: { ...signUpFormState },
      // });
      console.log({
          variables: { ...signUpFormState },
        });
      //Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setSignUpFormState({
      username: '',
      email: '',
      password: ''
    });
  };

  // useEffect((props) => {
  //   if (loginData && loginData.login) {
  //     props.setUser({ token: loginData.login.token, user: loginData.login.user });
  //   }
  // }, [loginData]);

  return (
    <div>
      <form onSubmit={handleLoginFormSubmit}>
              <h3 className='form-title'>Login</h3>
              <label htmlFor="username">
                Username:
              </label>
              <input
                className="form-input"
                placeholder="Your Username"
                name="username"
                type="text"
                id="username"
                value={loginFormState.username}
                onChange={handleLoginFormChange}
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
                value={loginFormState.password}
                onChange={handleLoginFormChange}
              />
              <button className="btn d-block w-100" type="submit">
                Login
              </button>
      </form>

      <form onSubmit={handleSignUpFormSubmit}>
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
                value={signUpFormState.username}
                onChange={handleSignUpFormChange}
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
                value={signUpFormState.email}
                onChange={handleSignUpFormChange}
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
                value={signUpFormState.password}
                onChange={handleSignUpFormChange}
              />
              <button className="btn d-block w-100" type="submit">
                SignUp
              </button>
      </form>


    </div>
  );
};

export default Login;
