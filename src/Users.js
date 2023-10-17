import React from "react";
import { Link } from "react-router-dom";
import UpdateUser from './UpdateUser';

const Users = ({ users }) => {
    console.log(users);
    return (
        <div>
            <h1>All Users ({users.length})</h1>
            <ul>
                {
                    users.map(user => {
                        return (
                            <li key={user.id}>
                                <div className='allUsers'>
                                    <div>
                                        <h3>{user.username}</h3>
                                        { user.avatar ? <img className='avatar' src={ user.avatar } /> : <img className='avatar' src={'assets/defaultavatar.png'} />}
                                        <p>ID: {user.id}</p>
                                        Account Created: ({new Date(user.created_at).toLocaleString()})
                                    </div>
                                    <div>
                                        <Link to={`/users/${user.id}/edit`}>Edit User</Link>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default Users;