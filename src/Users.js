import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
    return (
        <div className="container">
            <div className="mainPage users">
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
                                <hr/>
                            </li>
                        );
                    })
                }
            </ul>
            </div>
        </div>
    );
}

export default Users;