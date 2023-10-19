import React from "react";
import { Link } from "react-router-dom";

const User = ({ auth, addresses }) => {
    return(
        <div className='container'>
            <div className="mainPage userPage">
                <div>
                    { auth.is_admin ? 
                    <div className='identifiers'>
                    <img src='/assets/adminav48.png' title={'Administrator'}/>
                    <p>Administrator *</p> 
                    </div>
                    : null }
                    { auth.is_vip ? 
                    <div className='identifiers'>
                    <img src='/assets/ticket.png' title={'VIP Member'}/>
                    <p>VIP member *</p> 
                    </div>
                    : null }
                    <div className='identifiers'>
                    <Link to={`/settings/${auth.id}`}>Profile Settings</Link>
                    </div>
                </div>
                
                <h1>{auth.username}'s Profile</h1>
                { auth.avatar ? <img src={auth.avatar}/> : <img src='assets/defaultavatar.png' /> }
                <h2>Username: {auth.username}</h2>
                <h3>Saved Shipping Addresses</h3>
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
                
            </div>
        </div>
    );
}

export default User;