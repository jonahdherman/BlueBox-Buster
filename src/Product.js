import React from "react";
import { useParams, Link } from "react-router-dom";

const Product = ({ products, reviews, createReviews }) => {
    const { id } = useParams();
    const product = products.find(product => product.id === id);

    if (!product) {
        return null
    }
  

    return (
        <div>
            <Link to='/products' className="back"> Back</Link>
            <h1>Product Info</h1>
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
                          { review.text }
                        </li>
                      )
                  })   
                }
                </ul>
            </div>
            
        </div>
    );
}

export default Product;