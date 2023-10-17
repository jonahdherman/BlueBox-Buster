import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Addresses from './Addresses';

const Settings = ({auth, updateSelf, addresses, createAddress}) => {
    const { id } = useParams();

    const [username, setUsername] = useState('');
    const [error, setError] = useState('');


    const el = useRef();
    useEffect(() => {
        el.current.addEventListener('change', (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', async() => {
                const updatedSelf = {...auth, avatar: reader.result};
                await updateSelf(updatedSelf);
            });
        });
    }, []);


    const save = async(event) => {
        event.preventDefault();
        const updatedSelf = {
            ...auth,
            username
        }
        try {
            await updateSelf(updatedSelf);
            setError('Successfully update user');
        } catch (err) {
            setError(err)
        }
    }


    return (
        <div>
            <Link to={`/users/${id}`}>Back to Profile</Link>
            <h1>Profile Settings</h1>
            {
                error ? JSON.stringify(error, null, 2) : null
            }
            <form onSubmit={save}>
                <h2>Change Username?</h2>
                <input
                    value={username}
                    placeholder='username'
                    onChange={event => setUsername(event.target.value)}
                />
                <button type='submit'>Update</button>
            </form>
            <div>
                <h2>Change Avatar?</h2>
                { auth.avatar ? <img src={auth.avatar}/> : <img src='assets/defaultavatar.png' /> }<br />
                <input type='file' ref={ el }/>
            </div>
            <div>
                <Addresses createAddress={ createAddress } addresses={ addresses } />
            </div>
        </div>
    );
}

export default Settings;