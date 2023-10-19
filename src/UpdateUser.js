import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const UpdateUser = ({ users, updateUser }) => {
    const { id } = useParams();
    const user = users.find(user => user.id === id)

    const [username, setUsername] = useState('');
    const [vip, setVip] = useState('');
    const [admin, setAdmin] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const user = users.find(user => user.id === id);
        if (user) {
            setUsername(user.username);
            setVip(user.is_vip);
            setAdmin(user.is_admin);
        }
    }, [users]);

    const save = async(event) => {
        event.preventDefault();
        const updatedUser = {
            ...user,
            username,
            is_vip: vip,
            is_admin: admin
        }
        try {
            await updateUser(updatedUser);
            setError('Successfully update user');
        } catch (err) {
            setError(err)
        }
    }

    if (!user) {
        return null;
    }
    return (
        <div className="container">
            <div className="mainPage edituser">
            <Link to='/users'><p id="backButton">&#8592; Back</p></Link>
            <h1>Update User: {user.username}</h1>
            {
                error ? JSON.stringify(error, null, 2) : null
            }
            <form onSubmit={save}>
                <input
                    value={username}
                    placeholder='username'
                    onChange={event => setUsername(event.target.value)}
                />
                <p>Admin?</p>
                <select value={admin} onChange={event => setAdmin(event.target.value)}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <p>VIP?</p>
                <select value={vip} onChange={event => setVip(event.target.value)}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <button type='submit'>Update User!</button>
            </form>
        </div>
        </div>
    );
}

export default UpdateUser;