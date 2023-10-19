import React from 'react';

const Orders = ({ orders, products, lineItems, addresses }) => {
  if (!products.length) {
    return null;
  }
  return (
    <div className='container'>
      <div className='mainPage ordersPage'>
        <h2>Orders</h2>
        <ul>
          {
            orders.filter(order => !order.is_cart).map(order => {
              const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id);
              let totalPrice = 0;
              orderLineItems.forEach(lineItem => {
                const product = products.find(product => product.id === lineItem.product_id);
                totalPrice += product.price * lineItem.quantity;
              });
              const orderCount = orderLineItems.reduce((acc, item) => {
                return acc += item.quantity;
              }, 0);
              const address = addresses.find(address => address.id === order.address_id );
              return (
                <li key={order.id}>
                  <p>Order #: {order.id}</p>
                  <p>Date: ({new Date(order.created_at).toLocaleString()})</p>
                  <p>Total: ${(totalPrice / 100).toFixed(2)} ({orderCount} items)</p>
                  { address ? <p>Shipped to: {address.data.formatted_address}</p> : null }
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
                </li>
              );
            })
          }
        </ul>
        <h2>Addresses</h2>
        <ul>
          { addresses.length ?
            addresses.map(address => {
              return (
                <li key={address.id}>
                  {address.data.formatted_address}
                </li>
              );
            }) : <p>No Addresses Registered</p>
          }
        </ul>
      </div>
    </div>
  );
};

export default Orders;
