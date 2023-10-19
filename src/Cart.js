import React from 'react';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, cartCount, cartItems, increaseQuantity, decreaseQuantity })=> {
  let totalPrice = 0;
  cartItems.forEach(lineItem => {
    const product = products.find(product => product.id === lineItem.product_id)
    totalPrice += product.price * lineItem.quantity
  })

  return (
    <div className='container'>
      <div className='mainPage cartPage'>
        <h2>Cart</h2>
        <ul>
          {
            lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
              const product = products.find(product => product.id === lineItem.product_id) || {};
              return (
                <li key={ lineItem.id } className='cartLines'>
                  { product ?  <h3>{product.name} (Quantity: {lineItem.quantity}  x  ${(product.price / 100).toFixed(2)})</h3> : null}
                  <div className='cartButtons'>
                    <img src='/assets/plus.png' title={'Increase Quantity'} onClick={ ()=> increaseQuantity(lineItem) }/>
                    <img src='/assets/minus.png' title={'Decrease Quantity'} onClick={ ()=> decreaseQuantity(lineItem)}/>
                    <img src='/assets/trash.png' title={'Remove from Cart'} onClick={ ()=> removeFromCart(lineItem)}/>
                  </div>
                </li>
              );
            })
          }
        </ul>
        <h2>Cart Total: ${(totalPrice / 100).toFixed(2)} ({cartCount} items)</h2>
        {
          lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button onClick={()=> {
            updateOrder({...cart, is_cart: false });
          }}>Create Order</button>: null
        }
      </div>
    </div>
  );
};

export default Cart;
