import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ registerUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const register = async (event) => {
        event.preventDefault();
        try {
            await registerUser({ username, password });
            setError('success');
        }
        catch (ex) {
            console.log(ex.response);
            setError(ex.response.data.message);
        }
        setUsername('');
        setPassword('');

    }
    return (
        <div className='container'>
            <div className='mainPage register'>
                <div>
                    <h2>Create an Account</h2>
                    <form onSubmit={register}>
                        <input
                            placeholder='create username'
                            value={username}
                            onChange={ev => setUsername(ev.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='create password'
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
                        />
                        {
                            error ? <p>{error}</p> : ''
                        }
                        <button disabled={!username || !password}>Register</button>
                        <Link to='/login'>Already have an account? Login Now!</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;