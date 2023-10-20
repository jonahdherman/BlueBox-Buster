import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import CreateReviews from './CreateReviews';

const Product = ({ products, reviews, createReviews, auth, updateProduct, addWishList, removeWishList, wishLists, bookmarks, createBookmark, removeBookmark, cartItems, tag_lines, tags, createLineItem, updateLineItem }) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(product => product.id === id);
    
    if (!product) {
        return null
    }
    const productLines = tag_lines.filter(tag_line => tag_line.product_id === product.id);
    const productTags = productLines.map(line => tags.find(tag => tag.id === line.tag_id));
    const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
    const bookmark = bookmarks.find(bookmark => bookmark.product_id === id );

    const removeVIP = (product)=> {
      const vipProduct = {...product, vip_only: false}
      updateProduct(vipProduct);
  }

    const assignVIP = (product) => {
      const vipProduct = { ...product, vip_only: true }
      updateProduct(vipProduct);
    }

    return (
      <div className="container">
        <div className="mainPage">
            <p id="backButton" onClick={() => navigate(-1)}>&#8592; Back</p>
            <h1>{product.name}</h1>
            { product.image ? <img src={product.image} /> : null }
            <div className="priceAndTags">
                <h4>{`$${(product.price / 100).toFixed(2)}`}</h4>
                {productTags.length ?
                  <ul>
                      {
                        productTags.map(tag => {
                            return (
                                <li key={tag.id}>{tag.name}</li>
                            );
                        })
                      }
                  </ul>
                  : null}
              </div>
              <div id='singleProductButtons'>
                  {
                    bookmark ? <img id='bookmarkIcon' src='/assets/bkmrkF.png' title={'Remove Bookmark'} onClick={ ()=> removeBookmark(bookmark)}/> 
                    : <img id='bookmarkIcon' src='/assets/bkmrkE.png' title={'Add Bookmark'} onClick={ ()=> createBookmark({product_id: product.id, user_id: auth.id})} />
                  }
                  {
                  wishLists.find(wishlist => wishlist.product_id === product.id) ? <img id='wishListIcon' src='/assets/removeWishList.png' title={'Remove from Wishlist'} onClick={() => removeWishList(wishLists.find(wishlist => wishlist.product_id === product.id))}/> : 
                  <img id='wishListIcon' src='/assets/addWishList.png' title={'Add to Wishlist'} onClick={() => addWishList({product_id: product.id})}/>
                  }
                  {
                  auth.id ? (
                      cartItem ? <img id='cartIcon' src='/assets/addAnotherToCart.png' title={'Add Another to Cart'} onClick={() => updateLineItem(cartItem)}/> 
                      : <img id='cartIcon' src='/assets/addToCart.png' title={'Add to Cart'} onClick={() => createLineItem(product)}/>
                  ) : null
                  }
                  {
                  auth.is_admin && !product.vip_only ? <img id='ticketIcon' src='/assets/ticketAdd.png' title={'Make VIP Exclusive'} onClick={() => assignVIP(product)}/>
                  : 
                  auth.is_admin && product.vip_only ? <img id='ticketIcon' src='/assets/ticketRemove.png' title={'Remove VIP Exclusive'} onClick={() => removeVIP(product)}/> 
                  : null
                  }
              </div>
              <h4>Description: {product.description}</h4>
              <div className="reviews">
                <h2>Reviews</h2>
                <ul>
                {
                  reviews.filter(review => review.product_id === product.id).map(review => {
                      return (
                        <li key={review.id}>
                          { review.text } { review.rating } Stars
                        </li>
                      )
                  })   
                }
                </ul>
              </div>
              <CreateReviews createReviews={ createReviews } reviews={ reviews }/>
          </div>
      </div>
    );
    
}

export default Product;