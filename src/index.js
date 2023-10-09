import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';
import Login from './Login';
//import WishList from './WishList';
import api from './api';
import UpdateProduct from './UpdateProduct';
import Users from './Users';

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  //const [wishList, setWishList] = useState([]);

  const attemptLoginWithToken = async()=> {
    await api.attemptLoginWithToken(setAuth);
  }

  useEffect(()=> {
    attemptLoginWithToken();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.is_admin){
      const fetchData = async()=> {
        await api.fetchUsers(setUsers);
      };
      fetchData();
    }
  }, [auth]);

  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const updateLineItem = async(lineItem)=> {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async(order)=> {
    await api.updateOrder({ order, setOrders });
  };

  const removeFromCart = async(lineItem)=> {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const increaseQuantity = async(lineItem)=> {
    await api.increaseQuantity({ lineItem, lineItems, setLineItems });
  }

  const decreaseQuantity = async(lineItem)=> {
    await api.decreaseQuantity({ lineItem, lineItems, setLineItems });
  }

  // const updateWishList =async(wishList) => {
  //   await api.updateWishList({wishList, setWishList});
  // };

  // const removeFromWishList = async(lineItem) => {
  //   await api.removeFromWishList({lineItem, lineItems, setLineItems});
  // };

  const cart = orders.find(order => order.is_cart) || {};

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  // const list = orders.find(order => order.is_wishList) || {};

  // const wishListItems = lineItems.filter(lineItem => lineItem.order_id === wishList.id);

  // const wishListCount = wishListItems.reduce((acc, item) => {
  //   return acc += item.quantity;
  // }, 0);

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
  }

  const logout = ()=> {
    api.logout(setAuth);
  }

  return (
    <div>
      {
        auth.id ? (
          <>
            <nav>
              <Link to='/products'>Products ({ products.length })</Link>
              <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link>
              <Link to='/cart'>Cart ({ cartCount })</Link>
              {
                auth.is_admin ? <Link to='/users'>Users ({users.length})</Link> : ''
              }
              {/* <Link to='/wish_list'>Wish List ({wishListCount})</Link> */}
              <span>
                Welcome { auth.username }!
                <button onClick={ logout }>Logout</button>
              </span>
            </nav>
            <main>
              <Products
                auth = { auth }
                products={ products }
                cartItems = { cartItems }
                createLineItem = { createLineItem }
                updateLineItem = { updateLineItem }
              />
              { auth.is_admin ? (
                <Routes>
                  <Route path={'/products/:id/edit'} element={ <UpdateProduct /> }/>
                  <Route path={'/users'} element={ <Users users={ users } />}/>
                </Routes>
              ) : ''
              }
              <Cart
                cart = { cart }
                lineItems = { lineItems }
                products = { products }
                updateOrder = { updateOrder }
                removeFromCart = { removeFromCart }
                increaseQuantity={ increaseQuantity }
                decreaseQuantity={ decreaseQuantity }
                cartCount={ cartCount }
                cartItems={ cartItems }
              />
              <Orders
                orders = { orders }
                products = { products }
                lineItems = { lineItems }
              />
              {/* <WishList
                wishList = {list}
                lineItems = {lineItems}
                products = {products}
                updateWishList = {updateWishList}
                removeFromWishList = {removeFromWishList}
              /> */}
            </main>
            </>
        ):(
          <div>
            <Login login={ login }/>
            <Products
              products={ products }
              cartItems = { cartItems }
              createLineItem = { createLineItem }
              updateLineItem = { updateLineItem }
              auth = { auth }
            />
          </div>
        )
      }
      
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
