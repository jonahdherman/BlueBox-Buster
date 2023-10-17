import axios from 'axios';

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
  await fetchAddresses(setAddresses);
};

const createReviews = async({ review, reviews, setReviews })=> {
  const response = await axios.post('/api/reviews', review, getHeaders());
  setReviews([...reviews, response.data]);
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
  console.log(response);
  if (response.data.id && response.data.username === credentials.username) {
    login({credentials, setAuth});
  }
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
  logout,
  register,
  updateSelf,
  fetchProducts,
  fetchOrders,
  fetchWishList,
  fetchAllOrders,
  fetchUsers,
  fetchBookmarks,
  updateUser,
  fetchLineItems,
  fetchAllLineItems,
  fetchReviews,
  fetchAddresses,
  createLineItem,
  addWishList,
  createAddress,
  createWishListItem,
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
  deleteTag_line
};

export default api;
