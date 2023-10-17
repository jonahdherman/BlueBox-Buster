import React from "react";
import { Link } from "react-router-dom";

const User = ({ auth, addresses }) => {
    return(
        <div>
            { auth.is_admin ? <p>* Administrator</p> : null }
            { auth.is_vip ? <p>* VIP member</p> : null }
            <h1>{auth.username}'s Profile</h1>
            { auth.avatar ? <img src={auth.avatar}/> : <img src='assets/defaultavatar.png' /> }
            <h2>Username:</h2>
            <p>{auth.username}</p>
            <h3>Shipping Information</h3>
            <ul>
                { addresses.length ?
                    addresses.map(address => {
                        return(
                            <li key={address.id}>
                                {address.data.formatted_address}
                            </li>
                        );
                    }) : <li>No Addresses Registered</li>
                }
            </ul>
            <Link to={`/settings/${auth.id}`}>Profile Settings</Link>
        </div>
    );
}

export default User;