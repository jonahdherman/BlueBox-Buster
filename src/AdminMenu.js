import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = ({ users, allOrders, wishLists}) => {
    return (
        <div className="dropdown adminDrop">
            <div><Link to='/users' onClick={()=> scroll(0, 300)}>Users ({users.length})</Link></div>
            <div><Link to='/orders/all' onClick={()=> scroll(0, 300)}>All Orders ({allOrders.filter(order => !order.is_cart).length})</Link></div>
            <div><Link to='/wishlists'>Wish Lists ({wishLists.length})</Link></div>
        </div>
    );
}

export default AdminMenu;