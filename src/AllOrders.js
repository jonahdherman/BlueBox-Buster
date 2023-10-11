import React from "react";

const AllOrders = ({ allOrders, products, allLineItems }) => {
    if (!products.length) {
        return null;
    }
    return (
        <div>
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
                        return (
                            <li key={order.id}>
                                ({new Date(order.created_at).toLocaleString()})
                                <br />
                                User ID: {order.user_id}
                                <br/>
                                Order Total: ${(totalPrice / 100).toFixed(2)} ({orderCount} items)
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
    );
}

export default AllOrders