import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_MUTATION } from '../graphql/mutations';

import Auth from '../graphql/auth';

const Login = (props) => {
  const [loginFormState, setLoginFormState] = useState({ email: '', password: '' });
  const [signUpFormState, setSignUpFormState] = useState({ username: '', email: '', password: '' });
  const [errorDisplayState, setErrorDisplayState] = useState({ message: '', show: false });
  
  const [login] = useMutation(LOGIN_MUTATION);
  const [addUser] = useMutation(ADD_USER);

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
  
  const hideModal = () => {
    setErrorDisplayState({ message: '', show: false });
  };

  return (
    <div className="login-container main-background col">
      
      <form onSubmit={handleLoginFormSubmit} className="block-form-sections login-form col-6">
        <h3 className='form-title'>Login</h3>
        <label htmlFor="email" className="block-form-sections header-font">
          Email:
        </label>
        <input
          className="form-input block-form-sections"
          placeholder="Your Email"
          name="email"
          type="text"
          id="login-email"
          value={loginFormState.email}
          onChange={handleLoginFormChange}
        />
        <label htmlFor="password" className="block-form-sections header-font">
          Password:
        </label>
        <input
          className="form-input block-form-sections"
          placeholder="******"
          name="password"
          type="password"
          id="login-password"
          value={loginFormState.password}
          onChange={handleLoginFormChange}
        />
        <button className="btn block-form-sections mt-3 light-color" type="submit">
          Login
        </button>
      </form>

      <form onSubmit={handleSignUpFormSubmit} className="block-form-sections login-form col-6">
        <h3 className='form-title'>Sign-Up</h3>
        <label htmlFor="username" className='block-form-sections header-font'>
          Username:
        </label>
        <input
          className="form-input block-form-sections"
          placeholder="Your Username"
          name="username"
          type="text"
          id="signup-username"
          value={signUpFormState.username}
          onChange={handleSignUpFormChange}
        />
        <label htmlFor="email" className="block-form-sections header-font">
          Email:
        </label>
        <input
          className="form-input block-form-sections"
          placeholder="Your Email"
          name="email"
          type="text"
          id="signup-email"
          value={signUpFormState.email}
          onChange={handleSignUpFormChange}
        />
        <label htmlFor="password" className="block-form-sections">
          Password:
        </label>
        <input
          className="form-input block-form-sections"
          placeholder="******"
          name="password"
          type="password"
          id="signup-password"
          value={signUpFormState.password}
          onChange={handleSignUpFormChange}
        />
        <button className="btn block-form-sections mt-3 light-color" type="submit">
          SignUp
        </button>
      </form>

      <div>
        <h3>Welcome to the site where we all know how much work goes into Websites!</h3>
        <h4>Rules!</h4>
        <ul>
          <li>Contribute</li>
          <li>Be Constructive</li>
          <li>Don't post any malicious content</li>
          <li>Give us feedback on our website too!</li>
          <li>Have Fun!</li>
        </ul>
      </div>

      <Modal show={errorDisplayState.show} handleClose={hideModal}>
        <p>{errorDisplayState.message}</p>
      </Modal>

    </div>
  );
};

export default Login;
