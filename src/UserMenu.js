import React from "react";
import { Link } from "react-router-dom";

const UserMenu = ({ logout, wishLists, auth, orders }) => {
    return(
        <div className="dropdown">
            <div><Link to={`/users/${auth.id}`}>Profile</Link></div>
            <div><Link to='/wishlist' onClick={()=> scroll(0, 300)}>Wish List ({wishLists.length})</Link></div>
            <div><Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link></div>
            <div><Link to={`/settings/${auth.id}`} onClick={()=> scroll(0, 200)}>Settings</Link></div>
            <div><button onClick={ logout }>Logout</button></div>
            
        </div>
    );
}

export default UserMenu;