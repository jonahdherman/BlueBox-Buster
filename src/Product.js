import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import CreateReviews from './CreateReviews';
import WishList from './WishList'

const Product = ({ products, reviews, createReviews, auth, updateProduct, addWishList, removeWishList, wishLists, bookmarks, createBookmark, removeBookmark }) => {
    const { id } = useParams();
    const bookmark = bookmarks.find(bookmark => bookmark.product_id === id );
    const product = products.find(product => product.id === id);
    if (!product) {
        return null
    }

    return (
        <div>
            <Link to='/products' className="back"> Back</Link>
            <h1>Product Info</h1>
            {
              bookmark ? <h4>Bookmarked!<button onClick={ ()=> removeBookmark(bookmark)}>Remove Bookmark</button></h4> : <button onClick={ ()=> createBookmark({product_id: product.id, user_id: auth.id})}>Add Bookmark</button>
            }
            {
              wishLists.find(wishlist => wishlist.product_id === product.id) ? <button onClick={() => removeWishList(wishLists.find(wishlist => wishlist.product_id === product.id))}>Remove from Wish List</button> : 
              <button onClick={() => addWishList({product_id: product.id})}>Add to Wish List</button>
            }
            <div id='product'>
                <h2>{product.name}</h2>
                { product.image ? <img src={product.image} /> : null }
                <h4>{`$${(product.price / 100).toFixed(2)}`}</h4>
                <h4>Description: {product.description}</h4>
                <h4>Reviews</h4>
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
               <CreateReviews createReviews={ createReviews } reviews={ reviews }/>
            </div>
             
        </div>
        
          
        
        
    );
    
}

export default Product;