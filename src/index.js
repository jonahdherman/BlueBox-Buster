import React, { useRef , useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
import UpdateUser from './UpdateUser';
import Tags from './Tags';
import EditTags from './EditTags';
import AdminMenu from './AdminMenu';
import UserMenu from './UserMenu';
import Home from './Home';
import { all } from 'axios';
import User from './User';
import Settings from './Settings';
import AllWishLists from './AllWishLists';
import ProductSearch from './ProductSearch';


const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allLineItems, setAllLineItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [wishLists, setWishLists] = useState([]);
  const [allWishLists, setAllWishLists] = useState([]);
  const [tags, setTags] = useState([]);
  const [tag_lines, setTag_lines] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [allAddresses, setAllAddresses] = useState([]);
  const [dropdownUser, setDropdownUser] = useState(false);
  const [dropdownAdmin, serDropdownAdmin] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();

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
        await api.fetchWishList(setWishLists);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(() => {
    if(auth.id){
      const fetchData = async() => {
        await api.fetchAddresses(setAddresses);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
      const fetchData = async()=> {
        await api.fetchUsers(setUsers);
      };
      fetchData();
  }, []);

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

  useEffect(() => {
    if(auth.is_admin){
      const fetchData = async() => {
        await api.fetchAllWishLists(setAllWishLists);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(() => {
    if(auth.is_admin){
      const fetchData = async() => {
        await api.fetchAllAddresses(setAllAddresses);
      };
      fetchData();
    }
  }, [auth]);
  
  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchBookmarks(setBookmarks);
      };
      fetchData();
    }
  }, [auth]);

  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const createAddress = async(address)=> {
    await api.createAddress({address, setAddresses});
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

  const addWishList = async(wishList) => {
    await api.addWishList({wishList, setWishLists, wishLists})
  }

  const removeWishList = async(wishList) => {
    await api.removeWishList({wishList, setWishLists, wishLists})

  }
  
  const createReviews = async(review)=> {
    await api.createReviews({review, reviews, setReviews});
  };
  
  const createBookmark = async(bookmark)=> {
    await api.createBookmark({ bookmark, bookmarks, setBookmarks });
  };
  
  const removeBookmark = async(bookmark)=> {
    await api.removeBookmark({ bookmark, bookmarks, setBookmarks });
  };
  
  const cart = orders.find(order => order.is_cart) || {};

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const registerUser = async(credentials) => {
    await api.register({ credentials, setAuth});
  }

  const updateUser = async(updatedUser) => {
     await api.updateUser({ updatedUser, setUsers, users});
  }

  const updateSelf = async(updatedSelf) => {
    await api.updateSelf({ updatedSelf, auth, setAuth })
  }

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
  }

  const githubLogin = async()=>{
    await api.handleGithubLogin({ users, setAuth });
  }

  const logout = ()=> {
    api.logout(setAuth);
    navigate('/');
  }
  
  const handleMouseEnter = () => {
    setDropdownUser(true);
  };

  const handleMouseLeave = () => {
    setDropdownUser(false);
  };

  const handleMouseEnterAdmin = () => {
    serDropdownAdmin(true);
  };

  const handleMouseLeaveAdmin = () => {
    serDropdownAdmin(false);
  };

  return (
    <div>
      <h1 id='headTitle'>BLUEBOX-BUSTER</h1>
      {
        auth.id ? (
          <>
            <nav>
              {/* <Link to='/wishlist'>Wish List</Link> */}

              <div className='navItem'>
                <Link to='/'><img src='/assets/BBBlogoWhite.png' className='homeLogo'/></Link>
              </div>
              <div className='navItem'>
                <img src='assets/film48.png'/>
                <Link to='/products'>Products ({ products.length })</Link>
              </div>
              <div className='navItem'>
                <img src='assets/tag48.png'/>
                <Link to='/tags'>Tags ({ tags.length })</Link>
              </div>
              <div className='navItem'>
                <img src='/assets/search.png'/>
                <Link to='/products/search'>Search</Link>
              </div>
              <div className='navItem'>
                <img src='assets/cart48.png'/>
                <Link to='/cart'>Cart ({ cartCount })</Link>
              </div>
              <div className='navItem'>
                  { auth.avatar ? <img className='avatar' src={ auth.avatar } /> : <img className='avatar' src={'assets/defaultavatar.png'} />}
                <div onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                  Welcome { auth.is_vip === true ? 'VIP,' : ',' } { auth.username }!
                  { dropdownUser && <UserMenu logout={ logout } auth={ auth } wishLists={wishLists} orders={orders}/> }
                </div>
              </div>
              
              {
                auth.is_admin ? 
                <div className='navItem'>
                <img src='assets/adminav48.png'/>
                <div 
                  onMouseEnter={handleMouseEnterAdmin}
                  onMouseLeave={handleMouseLeaveAdmin}
                >
                  Admin
                    { dropdownAdmin && <AdminMenu users={users} allOrders={allOrders} wishLists={wishLists}/> }
                </div>

                </div>
                : null
              }
            </nav>
            <main> 
              <Routes>
                <Route path='/users/:id' element={ <User auth={ auth } addresses={ addresses } /> } />
                <Route path='/settings/:id' element={ <Settings auth={ auth } updateSelf={ updateSelf } createAddress={ createAddress } addresses={ addresses }/> }/>
                
                <Route path='/' element={ <Home auth={ auth }/> }/>
                <Route path='/products/:id' element={
                  <Product 
                  products={ products } 
                  reviews={ reviews } 
                  createReviews={ createReviews } 
                  auth={ auth } 
                  bookmarks={ bookmarks }
                  createBookmark={ createBookmark }
                  removeBookmark={ removeBookmark }
                  wishLists={wishLists}
                  addWishList={addWishList}
                  removeWishList={removeWishList}
                  cartItems={cartItems}
                  tag_lines={tag_lines}
                  tags={tags}
                  createLineItem = { createLineItem }
                  updateLineItem = { updateLineItem }
                  createProduct = { createProduct }
                  updateProduct={ updateProduct }
                  />
                }/>

                <Route path='/products/search/:term' element={
                  <ProductSearch
                  auth = { auth }
                  products={ products }
                  cartItems = { cartItems }
                  createLineItem = { createLineItem }
                  updateLineItem = { updateLineItem }
                  createProduct = { createProduct }
                  updateProduct={ updateProduct }
                  tags = { tags }
                  tag_lines = { tag_lines }
                  wishLists = { wishLists }
                  addWishList = { addWishList }
                  removeWishList = { removeWishList }
                  bookmarks = { bookmarks }
                  createBookmark={ createBookmark }
                  removeBookmark={ removeBookmark }
                />
                } />
                <Route path='/products/search' element={
                  <ProductSearch
                  auth = { auth }
                  products={ products }
                  cartItems = { cartItems }
                  createLineItem = { createLineItem }
                  updateLineItem = { updateLineItem }
                  createProduct = { createProduct }
                  updateProduct={ updateProduct }
                  tags = { tags }
                  tag_lines = { tag_lines }
                  wishLists = { wishLists }
                  addWishList = { addWishList }
                  removeWishList = { removeWishList }
                  bookmarks = { bookmarks }
                  createBookmark={ createBookmark }
                  removeBookmark={ removeBookmark }
                />
                } />
                
                <Route path='/products' element={
                  <Products
                  auth = { auth }
                  products={ products }
                  cartItems = { cartItems }
                  createLineItem = { createLineItem }
                  updateLineItem = { updateLineItem }
                  wishLists = { wishLists }
                  addWishList = { addWishList }
                  removeWishList = { removeWishList }
                  createProduct = { createProduct }
                  updateProduct={ updateProduct }
                  tags = { tags }
                  tag_lines = { tag_lines }
                  bookmarks = { bookmarks }
                  createBookmark={ createBookmark }
                  removeBookmark={ removeBookmark }

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
                    addresses={ addresses }
                    createAddress={ createAddress }
                />
                } />
                <Route path='/orders' element={ 
                  <Orders
                  orders = { orders }
                  products = { products }
                  lineItems = { lineItems }
                  addresses={ addresses }
                />
                } />
                <Route path='/wishlist' element={ 
                  <WishList
                    wishLists = {wishLists}
                    addWishList = {addWishList}
                    products = {products}
                    removeWishList = {removeWishList}
                    cartItems = { cartItems }
                    createLineItem = { createLineItem }
                    updateLineItem = { updateLineItem }
                  />
                } />

              </Routes>
              { auth.is_admin ? (
                <Routes>
                  <Route path={'/users'} element={ <Users users={ users } />}/>
                  <Route path={'/products/:id/edit'} element={ <UpdateProduct products={ products } updateProduct={updateProduct}/> }/>
                  <Route path={'/orders/all'} element={ <AllOrders allOrders={allOrders} products = { products } allLineItems = { allLineItems } allAddresses={ allAddresses }/> } />
                  <Route path={'/users/:id/edit'} element={<UpdateUser users={users} updateUser={ updateUser }/>}/>
                  <Route path={'/wishlists'} element={ <AllWishLists allWishLists={allWishLists} users={users} products={products}/>}/>
                  <Route path={'/tags/edit/'} element={ <EditTags products={products} tag_lines={ tag_lines } tags={tags} createTag_line={ createTag_line } deleteTag_line={ deleteTag_line}/> } />
                </Routes>
              ) : ''
              }
              
            </main>
            </>
        ):(
          <div>
            { !auth.id ? 
              <Routes>
                <Route path='/' element={<Login login={ login } githubLogin={ githubLogin }/>}/>
                <Route path='/login' element={<Login login={ login } githubLogin={ githubLogin }/>}/>
                <Route path='/orders' element={<Login login={ login } githubLogin={ githubLogin }/>}/>
                <Route path='/wishlist' element={<Login login={ login } githubLogin={ githubLogin }/>}/>
                <Route path='/cart' element={<Login login={ login } githubLogin={ githubLogin }/>}/>
                <Route path='/tags' element={<Login login={ login } githubLogin={ githubLogin }/>}/>
                <Route path='/tags/:term' element={<Login login={ login } githubLogin={ githubLogin }/>}/>
                <Route path='/products/search' element={<Login login={ login } githubLogin={ githubLogin }/>}/>
                <Route path='/products/search/:term' element={<Login login={ login } githubLogin={ githubLogin }/>}/>
                <Route path='/products/:id' element={<Login login={ login } githubLogin={ githubLogin }/>}/>
                <Route path='/users/:id' element={<Login login={ login } githubLogin={ githubLogin }/>}/>
                <Route path='/settings/:id' element={<Login login={ login } githubLogin={ githubLogin }/>}/>
                <Route path='/register' element={<Register registerUser={ registerUser }/>}/>
              </Routes>
            : null}
            
            
            <Routes>
              <Route path='/products' element= {
                <Products
                  products={ products }
                  cartItems = { cartItems }
                  createLineItem = { createLineItem }
                  updateLineItem = { updateLineItem }
                  wishLists = { wishLists }
                  addWishList = { addWishList }
                  removeWishList = { removeWishList }
                  auth = { auth }
                  tags = { tags }
                  tag_lines = { tag_lines }
                  bookmarks={ bookmarks }
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