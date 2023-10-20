import React from "react";
import ShipMap from "./ShipMap";

const AllOrders = ({ allOrders, products, allLineItems, allAddresses }) => {

    if (!products.length) {
        return null;
    }

    return (
        <div>
            <div id='shipMap'>
            <ShipMap allAddresses={allAddresses} allOrders={allOrders}/>
            </div>
        <div className="container">      
            <div className="mainPage allOrders">
                <h1>ALL ORDERS</h1>
                <ul>
                    {
                        allOrders.filter(order => !order.is_cart).map(order => {
                            const orderLineItems = allLineItems.filter(lineItem => lineItem.order_id === order.id);
                            let totalPrice = 0;
                            orderLineItems.forEach(lineItem => {
                                const product = products.find(product => product.id === lineItem.product_id);
                                totalPrice += product.price * lineItem.quantity;
                            });
                            const orderCount = orderLineItems.reduce((acc, item) => {
                                return acc += item.quantity;
                            }, 0);
                            const address = allAddresses.find(address => address.id === order.address_id );
                            return (
                                <li key={order.id}>
                                    <p>Order ID: {order.id}</p>
                                    <p>User ID: {order.user_id}</p>
                                    <p>Date placed: ({new Date(order.created_at).toLocaleString()})</p>
                                    { address ? <p>Shipped to: {address.data.formatted_address}</p> : null }
                                    <p>Order Total: ${(totalPrice / 100).toFixed(2)} ({orderCount} items)</p>
                                    <ul>
                                        {
                                            orderLineItems.map(lineItem => {
                                                const product = products.find(product => product.id === lineItem.product_id);
                                                return (
                                                    <li key={lineItem.id}>
                                                        {product ? product.name : ''} ({lineItem.quantity} x ${(product.price / 100).toFixed(2)})
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                    <hr />
                                </li>

                            );
                        })
                    }
                </ul>
            </div>
        </div>
        
        </div>
    );
}

export default AllOrders