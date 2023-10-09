import React from "react";

const Users = ({users}) => {
    return(
        <div>
            <h1>All Users ({users.length})</h1>
            <ul>
                {
                    users.map(user => {
                        return(
                            <li key={ user.id }>
                                {user.username}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default Users;