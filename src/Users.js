import React from "react";
import { Link } from "react-router-dom";
import UpdateUser from './UpdateUser';

const Users = ({ users }) => {
    return (
        <div>
            <h1>All Users ({users.length})</h1>
            <ul>
                {
                    users.map(user => {
                        return (
                            <li key={user.id}>
                                {user.username}
                                <Link to={`/users/${user.id}/edit`}>
                                    Edit User
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default Users;