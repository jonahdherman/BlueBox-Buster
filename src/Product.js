import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import CreateReviews from './CreateReviews';

const Product = ({ products, reviews, createReviews, auth }) => {
    const [bookmark, setBookmark] = useState(false);
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
            <div id='product'>
                <h2>{product.name}</h2>
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