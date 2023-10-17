import React from "react";
import { Link } from "react-router-dom";

const UserMenu = ({ logout, wishListCount, auth }) => {
    return(
        <div className="dropdown">
            <div><Link to={`/users/${auth.id}`}>Profile</Link></div>
            <div><Link to='/wishlist'>Wish List ({wishListCount})</Link></div>
            <div><Link to={`/settings/${auth.id}`}>Settings</Link></div>
            <div><button onClick={ logout }>Logout</button></div>
            
        </div>
    );
}

export default UserMenu;