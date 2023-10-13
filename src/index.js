import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';
import Login from './Login';
import WishList from './WishList';
import api from './api';
import Users from './Users';
import UpdateProduct from './UpdateProduct'
import Product from './Product';
import Register from './Register';
import AllOrders from './AllOrders';
import Reviews from './Reviews'
import UpdateUser from './UpdateUser';
import Tags from './Tags';
import EditTags from './EditTags';
import { all } from 'axios';



const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allLineItems, setAllLineItems] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [tags, setTags] = useState([]);
  const [tag_lines, setTag_lines] = useState([]);
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
    const fetchData = async()=> {
      await api.fetchReviews(setReviews);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchTags(setTags);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchTag_lines(setTag_lines);
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
  
  useEffect(() => {
    if(auth.id){
      const fetchData = async() => {
        await api.fetchWishListItems(setWishListItems);
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

  useEffect(()=> {
    if(auth.is_admin){
      const fetchData = async()=> {
        await api.fetchAllOrders(setAllOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.is_admin){
      const fetchData = async()=> {
        await api.fetchAllLineItems(setAllLineItems);
      };
      fetchData();
    }
  }, [auth]);

  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const createProduct = async(product)=> {
     await api.createProduct({ product, products, setProducts});
  };

  const createTag = async(tag)=> {
    await api.createTag({ tag, tags, setTags});
  };

  const createTag_line = async(newTag_line)=> {
    await api.createTag_line({ newTag_line, tag_lines, setTag_lines });
  };

  const deleteTag_line = async(tag_line)=> {
    await api.deleteTag_line({ tag_line, tag_lines, setTag_lines });
  };
  
  const updateLineItem = async(lineItem)=> {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateProduct = async(updatedProduct)=> {
    await api.updateProduct({ updatedProduct, products, setProducts});
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

  const updateWishListItem = async(wishList) => {
    await api.updateWishListItem({wishList, setWishList});
  };

  const createWishListItem = async(wishListItems) => {
    await api.createWishList({wishListItems, setWishListItems});
  }
  
  const removeFromWishList = async(lineItem) => {
    await api.removeFromWishList({lineItem, lineItems, setLineItems});
  };
  
  const createReviews = async(review)=> {
    await api.createReviews({review, reviews, setReviews});
  };
  
  const cart = orders.find(order => order.is_cart) || {};
  //console.log(cart);

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const list = products.find(product => product.is_list) || {};
  //console.log(products);
  
  // const wishListItems = lineItems.filter(lineItem => lineItem.order_id === list.id);
  // //console.log(wishListItems);

  const wishListCount = wishListItems.reduce((acc, item) => {
    return acc += item.quantity;
  }, 0);

  const registerUser = async(credentials) => {
    await api.register({ credentials, setAuth});
  }

  const updateUser = async(updatedUser) => {
     await api.updateUser({ updatedUser, setUsers, users});
  }

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
              <Link to='/tags'>Tags ({ tags.length })</Link>
              <Link to='/wishlist'>Wish List ({wishListCount})</Link>

              {
                auth.is_admin ? 
                <div>
                <Link to='/users'>Users ({users.length})</Link>
                <Link to='/orders/all'>All Orders ({allOrders.length})</Link>
                </div>
                : ''
              }
              
              <span>
                Welcome { auth.username }!
                {
                 auth.is_vip === true ? 'VIP!' : '' 
                }
                <button onClick={ logout }>Logout</button>
              </span>
            </nav>
            <main> 
              <Routes>
                <Route path='/products/:id' element={<Product products={ products } reviews={ reviews } createReviews={ createReviews } />}/>

                <Route path='/products/search/:term' element={
                  <Products
                  auth = { auth }
                  products={ products }
                  cartItems = { cartItems }
                  createLineItem = { createLineItem }
                  updateLineItem = { updateLineItem }
                  createProduct = { createProduct }
                  updateProduct={ updateProduct }
                  tags = { tags }
                  tag_lines = { tag_lines }
                />
                } />
                <Route path='/products' element={
                  <Products
                  auth = { auth }
                  products={ products }
                  cartItems = { cartItems }
                  createLineItem = { createLineItem }
                  updateLineItem = { updateLineItem }
                  createProduct = { createProduct }
                  updateProduct={ updateProduct }
                  tags = { tags }
                  tag_lines = { tag_lines }
                />
                } />
                <Route path='/tags' element={ 
                  <Tags
                  tags = { tags }
                  tag_lines = { tag_lines }
                  auth = { auth }
                  products={ products }
                  createTag = { createTag }
                />
                } />
                <Route path='/tags/:term' element={ 
                  <Tags
                  tags = { tags }
                  tag_lines = { tag_lines }
                  auth = { auth }
                  products={ products }
                  createTag = { createTag }
                />
                } />
                <Route path='/cart' element={ 
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
                } />
                <Route path='/orders' element={ 
                  <Orders
                  orders = { orders }
                  products = { products }
                  lineItems = { lineItems }
                />
                } />
                <Route path='/wishlist' element={ 
                  <WishList
                  wishList = {list}
                  wishListItems = {wishListItems}
                  createWishListItems = {createWishListItem}
                  products = {products}
                  updateWishList = {updateWishListItem}
                  removeFromWishList = {removeFromWishList}
                  />
                } />
              </Routes>

              { auth.is_admin ? (
                <Routes>
                  <Route path={'/users'} element={ <Users users={ users } />}/>
                  <Route path={'/products/:id/edit'} element={ <UpdateProduct products={ products } updateProduct={updateProduct}/> }/>
                  <Route path={'/orders/all'} element={ <AllOrders allOrders={allOrders} products = { products } allLineItems = { allLineItems }/> } />
                  <Route path={'/users/:id/edit'} element={<UpdateUser users={users} updateUser={ updateUser }/>}/>
                  <Route path={'/tags/edit/'} element={ <EditTags products={products} tag_lines={ tag_lines } tags={tags} createTag_line={ createTag_line } deleteTag_line={ deleteTag_line}/> } />
                </Routes>
              ) : ''
              }
              
            </main>
            </>
        ):(
          <div>
            <Login login={ login }/>
            <Register registerUser={ registerUser }/>
            <Routes>
              <Route path='/products' element= {
                <Products
                  products={ products }
                  cartItems = { cartItems }
                  createLineItem = { createLineItem }
                  updateLineItem = { updateLineItem }
                  auth = { auth }
                  tags = { tags }
                  tag_lines = { tag_lines }
                />
              } />
            </Routes>
            
          </div>
        )
      }
      
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
