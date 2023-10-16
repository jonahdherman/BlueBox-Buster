import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = ({ users, allOrders}) => {
    return (
        <div className="dropdown">
            <div><Link to='/users'>Users ({users.length})</Link></div>
            <div><Link to='/orders/all'>All Orders ({allOrders.filter(order => !order.is_cart).length})</Link></div>
        </div>
    );
}

export default AdminMenu;