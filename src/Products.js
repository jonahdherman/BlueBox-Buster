import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CreateProduct from './CreateProduct';
import VipProducts from './VipProducts';
import NonVipProducts from './NonVipProducts';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, createProduct, updateProduct, wishLists, addWishList, removeWishList, tags, tag_lines }) => {
  const navigate = useNavigate();
  const { term } = useParams();

  return (
    <div>
      <h2>Products</h2>
      <input placeholder='search for products' value = { term || ''} onChange = { ev => 
        navigate(ev.target.value ? `/products/search/${ev.target.value}` : '/products')}/>
      
      { 
        auth.is_vip || auth.is_admin ?
        <div>
          <h2>VIP Exclusives!</h2>
        <VipProducts 
          products={products} 
          cartItems={cartItems} 
          createLineItem={createLineItem} 
          updateLineItem={updateLineItem} 
          auth={auth} 
          updateProduct={updateProduct} 
          term={term} 
          tags={ tags } 
          tag_lines={ tag_lines } 
          wishLists={wishLists}
          addWishList = {addWishList} 
          removeWishList = {removeWishList}
          bookmarks={bookmarks}
          createBookmark={createBookmark}
          removeBookmark={removeBookmark}
          />
        </div> 
        : null 
      }
      { auth.is_vip || auth.is_admin ? <h2>Standard Products</h2> : <h2>All Products</h2> }
      <NonVipProducts 
          products={products} 
          cartItems={cartItems} 
          createLineItem={createLineItem} 
          updateLineItem={updateLineItem} 
          auth={auth} 
          updateProduct={updateProduct} 
          term={term} 
          tags={ tags } 
          tag_lines={ tag_lines } 
          wishLists={wishLists}
          addWishList = {addWishList} 
          removeWishList = {removeWishList}
          bookmarks={bookmarks}
          createBookmark={createBookmark}
          removeBookmark={removeBookmark}
        />

      {
        auth.is_admin ? (
          <CreateProduct createProduct={createProduct} />
        ) : null
      }
    
    </div>
  );
};

export default Products;
