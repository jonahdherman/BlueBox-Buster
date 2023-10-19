import React, { useState, useRef, useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, cartCount, cartItems, increaseQuantity, decreaseQuantity, addresses, createAddress })=> {
  const [shipping, setShipping] = useState('');
  const el = useRef();

  let totalPrice = 0;
  cartItems.forEach(lineItem => {
    const product = products.find(product => product.id === lineItem.product_id)
    totalPrice += product.price * lineItem.quantity
  })

  const submitOrder = () => {
    const newOrder = {...cart, is_cart: false, address_id: shipping }
    updateOrder(newOrder);
  }

  useEffect(()=> {
    const setup = async()=> {
      const loader = new Loader({
        apiKey: window.GOOGLE_API,
      });
     await loader.load();
     const { Autocomplete } = await google.maps.importLibrary("places");
      const options = {
        fields: [
          'formatted_address',
          'geometry'
        ]
      };
      const autocomplete = new Autocomplete(el.current, options);
      autocomplete.addListener('place_changed', async()=> {
        const place = autocomplete.getPlace();
        const address = { data: place };
        await createAddress(address); 
        el.current.value = '';
      });
    }
    setup();
  }, []);

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
        <hr/>
        { addresses.length ? (
          <div className='cartAddress'>
          <h3>Select A Shipping Address</h3>
          
          <select
            value={shipping}
            onChange={event => setShipping(event.target.value)}
            >
            <option value={''}>- Select Address -</option>
            {
              addresses.map(address => {
                return(
                  <option 
                  key={address.id}
                  value={address.id}
                  >
                    {address.data.formatted_address}
                  </option>
                );
              })
            }
          </select>
          <br/>
          {
            lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? 
            <button
            onClick={()=> { submitOrder()}}
            disabled={!shipping}
            >
              Create Order
            </button>: null
          }
        </div>
          ) : (
            <div className='cartAddress'>
              <h3>No Addresses Found, Please add one!</h3>
              <input ref={ el } />
            </div>
          )}
      </div>
    </div>
  );
};

export default Cart;
