import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



const CreateReviews = ({ reviews, createReviews })=> {
  const [text, setText] = useState('')
  const [product_id, setProduct_id] = useState('')
  const [rating, setRating] = useState('')
  const { id } = useParams();
  const review = reviews.find(review => review.product_id === id);
  
  
  const saveInfo = (event) => {
    event.preventDefault();
    const review = {
        text,
        product_id: id,
        rating
       
    }
    createReviews(review)
  };
  
  return (
        <div>
          <h4>Add a review:</h4>
          <form onSubmit={saveInfo}>
            <textarea
              value={text}
              rows={ 5 }
              placeholder="Enter a Review"
              onChange={event => setText(event.target.value)}
            ></textarea>
            <div>
            <input 
              value={rating}
              type="number" 
              id="quantity" 
              name="quantity" 
              min="1" 
              max="5"
              placeholder= "1"
              onChange={event => setRating(event.target.value)}/>
              
            <button type='submit' disabled={ false }>Add Review</button>
            </div>
        </form>
        </div>
        )
    
};

export default CreateReviews;