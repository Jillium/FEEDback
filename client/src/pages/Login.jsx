import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_MUTATION } from '../graphql/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [loginFormState, setLoginFormState] = useState({ email: '', password: '' });
  const [signUpFormState, setSignUpFormState] = useState({ username: '', email: '', password: '' });
  const [errorDisplayState, setErrorDisplayState] = useState({ message: '', show: false });
  
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
      const { data } = await login({
        variables: { ...loginFormState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      const errorMessage = `${e}`.split(':').reverse()[0];
      setErrorDisplayState({
        message: errorMessage,
        show: true
      });
      console.error(e);
    }
    // clear form values
    setLoginFormState({
      email: '',
      password: ''
    });
  };

  // submit sign up form
  const handleSignUpFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...signUpFormState },
      });
      
      Auth.login(data.addUser.token);
    } catch (e) {
      const errorMessage = `${e}`.split(':').reverse()[0];
      setErrorDisplayState({
        message: errorMessage,
        show: true
      });
      console.error(e);
    }
    // clear form values
    setSignUpFormState({
      username: '',
      email: '',
      password: ''
    });
  };

  const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button onClick={handleClose}>Close</button>
        </section>
      </div>
    );
  };

  const showModal = () => {
    setErrorDisplayState({ ...errorDisplayState, show: true });
  };

  const hideModal = () => {
    setErrorDisplayState({ message: '', show: false });
  };

  // useEffect((props) => {
  //   if (loginData && loginData.login) {
  //     props.setUser({ token: loginData.login.token, user: loginData.login.user });
  //   }
  // }, [loginData]);

  return (
    <div className="login-container">
      <form onSubmit={handleLoginFormSubmit}>
              <h3 className='form-title'>Login</h3>
              <label htmlFor="email">
                Email:
              </label>
              <input
                className="form-input"
                placeholder="Your Email"
                name="email"
                type="text"
                id="login-email"
                value={loginFormState.email}
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
                id="login-password"
                value={loginFormState.password}
                onChange={handleLoginFormChange}
              />
              <button className="btn col-12 col-md-3" type="submit">
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
                id="signup-username"
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
                id="signup-email"
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
                id="signup-password"
                value={signUpFormState.password}
                onChange={handleSignUpFormChange}
              />
              <button className="btn col-12 col-md-3" type="submit">
                SignUp
              </button>
      </form>

      <Modal show={errorDisplayState.show} handleClose={hideModal}>
          <p>{errorDisplayState.message}</p>
      </Modal>


    </div>
  );
};

export default Login;
