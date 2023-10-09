import React from 'react';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, cartCount, cartItems, increaseQuantity, decreaseQuantity })=> {
  let totalPrice = 0;
  cartItems.forEach(lineItem => {
    const product = products.find(product => product.id === lineItem.product_id)
    totalPrice += product.price * lineItem.quantity
  })

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {
          lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            return (
              <li key={ lineItem.id }>
                { product.name } ({ lineItem.quantity } x ${ (product.price / 100).toFixed(2) })
                <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
                <button onClick={ ()=> increaseQuantity(lineItem) }>+</button>
                <button onClick={ ()=> decreaseQuantity(lineItem)}>-</button>
              </li>
            );
          })
        }
      </ul>
      <h3>Cart Total: ${(totalPrice / 100).toFixed(2)} ({cartCount} items)</h3>
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button onClick={()=> {
          updateOrder({...cart, is_cart: false });
        }}>Create Order</button>: null
      }
    </div>
  );
};

export default Cart;
