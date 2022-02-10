import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations';

const Login = (props) => {
  const [loginFormState, setLoginFormState] = useState({ loginUsername: '', loginPassword: '' });
  const [signUpFormState, setSignUpFormState] = useState({ signUpUsername: '', signUpEmail: '', signUpPassword: '' });
  const [loginUsername, setLoginUsername] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  // loginmutation had loading and error in the {} but they were throwing errors so I removed them for the time being 
  const [login, { loginData }] = useMutation(LOGIN_MUTATION);
  const [addUser, { signUpData }] = useMutation(LOGIN_MUTATION);

  // update state based on form input changes
  const handleLoginFormChange = (event) => {
    const { name, value } = event.target;

    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  // update state based on form input changes
  const handleSignUpFormChange = (event) => {
    const { name, value } = event.target;

    setSignUpFormState({
      ...signUpFormState,
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
      {/* <form onSubmit={(e) => {
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
      </form> */}

      <form onSubmit={(e) => {
        e.preventDefault();
        login({ variables: { name: loginUsername } });
      }}>
              <h3 className='form-title'>Login</h3>
              <label htmlFor="loginUsername">
                Username:
              </label>
              <input
                className="form-input"
                placeholder="Your Username"
                name="loginUsername"
                type="text"
                id="loginUsername"
                value={loginFormState.loginUsername}
                onChange={handleLoginFormChange}
              />
              <label htmlFor="loginPassword">
                Password:
              </label>
              <input
                className="form-input"
                placeholder="******"
                name="loginPassword"
                type="password"
                id="loginPassword"
                value={loginFormState.loginPassword}
                onChange={handleLoginFormChange}
              />
              <button className="btn d-block w-100" type="submit">
                Login
              </button>
      </form>

      <form onSubmit={(e) => {
        e.preventDefault();
        addUser({ variables: { name: signUpUsername } });
      }}>
              <h3 className='form-title'>Sign-Up</h3>
              <label htmlFor="signUpUsername">
                Username:
              </label>
              <input
                className="form-input"
                placeholder="Your Username"
                name="signUpUsername"
                type="text"
                id="signUpUsername"
                value={signUpFormState.signUpUsername}
                onChange={handleSignUpFormChange}
              />
              <label htmlFor="signUpEmail">
                Email:
              </label>
              <input
                className="form-input"
                placeholder="Your Email"
                name="signUpEmail"
                type="text"
                id="signUpEmail"
                value={signUpFormState.signUpEmail}
                onChange={handleSignUpFormChange}
              />
              <label htmlFor="signUpPassword">
                Password:
              </label>
              <input
                className="form-input"
                placeholder="******"
                name="signUpPassword"
                type="password"
                id="signUpPassword"
                value={signUpFormState.signUpPassword}
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
