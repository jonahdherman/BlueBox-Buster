import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ login, githubLogin }) => {
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
    <div className='container'>
      <div className='mainPage login'>
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
            <Link to='/register'>New? Register For Full Access!</Link>
          </form>
          <p>or</p>
          <div onClick={githubLogin} className='github'>
            <img src='assets/github-mark-white.png' title='Login with Github' />
            <p>Sign In With Github</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
