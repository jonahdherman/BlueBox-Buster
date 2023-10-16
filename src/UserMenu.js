import React from "react";
import { Link } from "react-router-dom";

const UserMenu = ({ logout, wishListCount }) => {
    return(
        <div className="dropdown">
            <div>Profile</div>
            <div>usermenu</div>
            <div><Link to='/wishlist'>Wish List ({wishListCount})</Link></div>
            <div>Settings</div>
            <div><button onClick={ logout }>Logout</button></div>
            
        </div>
    );
}

export default UserMenu;