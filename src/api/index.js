import axios from 'axios';
import {gitAuth, provider} from '../FirebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const getHeaders = ()=> {
  return {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  };
};

const fetchProducts = async(setProducts)=> {
  const response = await axios.get('/api/products');
  setProducts(response.data);
};

const fetchReviews = async(setReviews)=> {
  const response = await axios.get('/api/reviews');
  setReviews(response.data);
};

const fetchWishList = async(setWishLists)=> {
  const response = await axios.get('/api/wishlist_items', getHeaders());
  setWishLists(response.data);
};

const fetchAllWishLists = async(setAllWishLists)=> {
  const response = await axios.get('/api/wishlist_items/all', getHeaders());
  setAllWishLists(response.data);
};

const addWishList = async({wishList, setWishLists, wishLists}) => {
  const response = await axios.post('/api/wishlist_items', wishList, getHeaders());
  setWishLists([...wishLists, response.data]);
};

const removeWishList = async({wishList, setWishLists, wishLists}) => {
  const response = await axios.delete(`/api/wishlist_items/${wishList.id}`, getHeaders());
  setWishLists(wishLists.filter(_wishlist => _wishlist.id !== wishList.id));
};

const fetchOrders = async(setOrders)=> {
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const fetchAllOrders = async(setAllOrders)=> {
  const response = await axios.get('/api/orders/all', getHeaders());
  setAllOrders(response.data);
};


const fetchAddresses = async(setAddresses)=> {
  const response = await axios.get('/api/addresses', getHeaders());
  setAddresses(response.data);
};

const fetchAllAddresses = async(setAllAddresses)=> {
  const response = await axios.get('/api/addresses/all', getHeaders());
  setAllAddresses(response.data);
};


const fetchBookmarks = async(setBookmarks)=> {
  const response = await axios.get('/api/bookmarks', getHeaders());
  setBookmarks(response.data);
};

const fetchUsers = async(setUsers)=> {
  const response = await axios.get('/api/users', getHeaders());
  setUsers(response.data);
};

const fetchLineItems = async(setLineItems)=> {
  const response = await axios.get('/api/lineItems', getHeaders());
  setLineItems(response.data);
};

const fetchAllLineItems = async(setAllLineItems)=> {
  const response = await axios.get('/api/lineItems/all', getHeaders());
  setAllLineItems(response.data);
};

const fetchTags = async(setTags)=> {
  const response = await axios.get('/api/tags');
  setTags(response.data);
};

const fetchTag_lines = async(setTag_lines)=> {
  const response = await axios.get('/api/tag_lines');
  setTag_lines(response.data);
};

const createLineItem = async({ product, cart, lineItems, setLineItems })=> {
  const response = await axios.post('/api/lineItems', {
    order_id: cart.id,
    product_id: product.id
  }, getHeaders());
  setLineItems([...lineItems, response.data]);
};

const createProduct = async({ product, products, setProducts })=> {
  const response = await axios.post('/api/products', product, getHeaders());
  setProducts([...products, response.data]);
};

const createAddress = async({ address, setAddresses })=> {
  const response = await axios.post('/api/addresses', address, getHeaders());
  fetchAddresses(setAddresses);
};

const createReviews = async({ review, reviews, setReviews })=> {
  const response = await axios.post('/api/reviews', review, getHeaders());
  setReviews([...reviews, response.data]);
};

const createBookmark = async({ bookmark, bookmarks, setBookmarks })=> {
  const response = await axios.post('/api/bookmarks', bookmark, getHeaders());
  setBookmarks([...bookmarks, response.data]);
};

const removeBookmark = async({ bookmark, bookmarks, setBookmarks})=> {
  const response = await axios.delete(`/api/bookmarks/${bookmark.id}`, getHeaders());
  setBookmarks(bookmarks.filter(_bookmark => _bookmark.id !== bookmark.id));
};

const createTag = async({ tag, tags, setTags})=> {
  const response = await axios.post('/api/tags', tag, getHeaders());
  setTags([...tags, response.data].sort((a, b) => a.name.localeCompare(b.name)));
};

const createTag_line = async({ newTag_line, tag_lines, setTag_lines})=> {
  const response = await axios.post('/api/tag_lines', newTag_line, getHeaders());
  setTag_lines([...tag_lines, response.data]);
};

const deleteTag_line = async({ tag_line, tag_lines, setTag_lines})=> {
  const response = await axios.delete(`/api/tag_lines/${tag_line.id}`, getHeaders());
  setTag_lines(tag_lines.filter(tagline => tagline.id !== tag_line.id));
};

const updateLineItem = async({ lineItem, cart, lineItems, setLineItems })=> {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity + 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map( lineItem => lineItem.id == response.data.id ? response.data: lineItem));
};

const updateProduct = async({ updatedProduct, products, setProducts }) => {
    const response = await axios.put(`/api/products/${updatedProduct.id}`, updatedProduct, getHeaders());
    setProducts(products.map(product => product.id === updatedProduct.id ? response.data : product));
};

const updateOrder = async({ order, setOrders })=> {
  await axios.put(`/api/orders/${order.id}`, order, getHeaders());
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const increaseQuantity = async ({lineItem, lineItems, setLineItems}) => {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    ...lineItem,
    quantity: lineItem.quantity + 1
  }, getHeaders());
  setLineItems(lineItems.map(lineItem => lineItem.id == response.data.id ? response.data : lineItem));
};


const decreaseQuantity = async ({lineItem, lineItems, setLineItems}) => {
  if (lineItem.quantity > 1) {
    const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    ...lineItem,
    quantity: lineItem.quantity - 1
  }, getHeaders());
  setLineItems(lineItems.map(lineItem => lineItem.id == response.data.id ? response.data : lineItem));
  }
  if (lineItem.quantity === 1) {
    await removeFromCart({lineItem, lineItems, setLineItems});
  }
  
}

const removeFromCart = async({ lineItem, lineItems, setLineItems })=> {
  const response = await axios.delete(`/api/lineItems/${lineItem.id}`, getHeaders());
  setLineItems(lineItems.filter( _lineItem => _lineItem.id !== lineItem.id));
};

const attemptLoginWithToken = async(setAuth)=> {
  const token = window.localStorage.getItem('token');
  if(token){
    try {
      const response = await axios.get('/api/me', getHeaders());
      setAuth(response.data);
    }
    catch(ex){
      if(ex.response.status === 401){
        window.localStorage.removeItem('token');
      }
    }
  }
}

const updateUser = async({ updatedUser, setUsers, users }) => {
  const response = await axios.put(`/api/users/${updatedUser.id}`, updatedUser, getHeaders());
  setUsers(users.map(user => user.id === updatedUser.id ? response.data : user));
}

const updateSelf = async({ updatedSelf, auth, setAuth}) => {
  const response = await axios.put(`/api/users/settings/${auth.id}`, updatedSelf, getHeaders());
  setAuth(response.data);
}

const register = async({ credentials, setAuth }) => {
  const response = await axios.post('/api/users', credentials);
  if (response.data.id && response.data.username === credentials.username) {
    login({credentials, setAuth});
  }
}

const handleGithubLogin = async({users, setAuth})=>{
  let credentials = null;
  await signInWithPopup(gitAuth, provider).then(async(result)=>{
    credentials = users.find(user => user.username === result.user.reloadUserInfo.screenName);
    if (!credentials) {
      credentials = {
        username: result.user.reloadUserInfo.screenName,
        password: result._tokenResponse.localId,
        is_admin: false,
        is_vip: false,
        avatar: result.user.reloadUserInfo.photoUrl
      }
      register({ credentials, setAuth});
    } 
    else {
      credentials = {
        username: result.user.reloadUserInfo.screenName,
        password: result._tokenResponse.localId,
        is_admin: false,
        is_vip: false,
        avatar: result.user.reloadUserInfo.photoUrl
      }
      login({ credentials, setAuth });
    }
  }).catch((err)=>{
    console.log(err);
  })
}

const login = async({ credentials, setAuth })=> {
  const response = await axios.post('/api/login', credentials);
  const { token } = response.data;
  window.localStorage.setItem('token', token);
  attemptLoginWithToken(setAuth);
}

const logout = (setAuth)=> {
  window.localStorage.removeItem('token');
  setAuth({});
}

const api = {
  login,
  handleGithubLogin,
  logout,
  register,
  updateSelf,
  fetchProducts,
  fetchOrders,
  fetchWishList,
  fetchAllWishLists,
  fetchAllOrders,
  fetchUsers,
  fetchBookmarks,
  updateUser,
  fetchLineItems,
  fetchAllLineItems,
  fetchReviews,
  fetchAddresses,
  fetchAllAddresses,
  createLineItem,
  addWishList,
  createAddress,
  createProduct,
  createReviews,
  updateLineItem,
  updateOrder,
  updateProduct,
  removeFromCart,
  removeWishList,
  attemptLoginWithToken,
  increaseQuantity,
  decreaseQuantity,
  fetchTags,
  fetchTag_lines,
  createTag,
  createTag_line,
  deleteTag_line,
  createBookmark,
  removeBookmark
};

export default api;
