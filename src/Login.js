import React, { useState } from 'react';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const _login = async (ev) => {
    ev.preventDefault();
    try {
      await login({ username, password });
    }
    catch (ex) {
      console.log(ex.response.data);
      setError(ex.response.data.message);
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={_login}>
        <input
          placeholder='username'
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />
       
        {
          error ? <p>{error}</p> : ''
        }
        <button disabled={!username || !password}>Login</button>
      </form>
    </div>
  );
}

export default Login;
