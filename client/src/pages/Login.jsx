import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations';

const Login = (props) => {
  const [username, setUsername] = useState('');
  // loginmutation had loading and error in the {} but they were throwing errors so I removed them for the time being 
  const [login, { data }] = useMutation(LOGIN_MUTATION);

  useEffect((props) => {
    if (data && data.login) {
      props.setUser({ token: data.login.token, author: data.login.author });
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
    </div>
  );
};

export default Login;
