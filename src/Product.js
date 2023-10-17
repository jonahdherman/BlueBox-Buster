import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import CreateReviews from './CreateReviews';
import WishList from './WishList'


const Product = ({ products, reviews, createReviews, auth, updateProduct, addWishList, removeWishList, wishLists }) => {
    const { id } = useParams();
    const product = products.find(product => product.id === id);
    if (!product) {
        return null
    }
    const handleChange = () => { 
      setBookmark(!bookmark)
      const bookmarkedProduct = {
      
      }
      console.log(bookmarkedProduct)
    }; 
  

    return (
        <div>
            <Link to='/products' className="back"> Back</Link>
            <h1>Product Info</h1>
                {
                  auth.id ?
                  <div><button onClick={ handleChange } >Bookmark Item</button></div> 
                  : null
                }
                {
                  auth.id ? <WishList product = { product } wishList = {wishLists.find(wish => wish.product_id === product.id)} addWishList= {addWishList} removeWishList={removeWishList} />: null
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