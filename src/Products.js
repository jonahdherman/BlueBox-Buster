import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CreateProduct from './CreateProduct';
import VipProducts from './VipProducts';
import NonVipProducts from './NonVipProducts';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, createProduct, updateProduct, wishLists, addWishList, removeWishList, tags, tag_lines, bookmarks, createBookmark, removeBookmark }) => {
  const navigate = useNavigate();
  const { term } = useParams();

  return (
    <div className='allProductsPage'>
      <h2>Products</h2>
      <input placeholder='search for products' value = { term || ''} onChange = { ev => 
        navigate(ev.target.value ? `/products/search/${ev.target.value}` : '/products')}/>
      <div className='productBlocks'>
      { 
        auth.is_vip || auth.is_admin ?
            <VipProducts
              products={products}
              cartItems={cartItems}
              createLineItem={createLineItem}
              updateLineItem={updateLineItem}
              auth={auth}
              updateProduct={updateProduct}
              term={term} 
              tags={tags}
              tag_lines={tag_lines}
              wishLists={wishLists}
              addWishList={addWishList}
              removeWishList={removeWishList}
              bookmarks={bookmarks}
              createBookmark={createBookmark}
              removeBookmark={removeBookmark}
            />
          : null
      }
      <NonVipProducts
        products={products}
        cartItems={cartItems}
        createLineItem={createLineItem}
        updateLineItem={updateLineItem}
        auth={auth}
        updateProduct={updateProduct}
        term={term} 
        tags={tags}
        tag_lines={tag_lines}
        wishLists={wishLists}
        addWishList={addWishList}
        removeWishList={removeWishList}
        bookmarks={bookmarks}
        createBookmark={createBookmark}
        removeBookmark={removeBookmark}
      />

      {
        auth.is_admin ? (
          <div className='productForm'>
          <CreateProduct createProduct={createProduct} />
          </div>
        ) : null
      }
      </div>
    
    </div>
  );
};

export default Products;
