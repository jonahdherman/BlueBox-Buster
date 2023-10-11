import React, { useState } from 'react';

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
        <div>
            <h2>or Register</h2>
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
            </form>
        </div>
    );
}

export default Register;