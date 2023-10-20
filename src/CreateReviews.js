import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



const CreateReviews = ({ reviews, createReviews })=> {
  const [text, setText] = useState('')
  const [rating, setRating] = useState('')
  const { id } = useParams();
  
  
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
        <div className="reviewFormPage">
          <h4>Leave a Review!</h4>
          <form onSubmit={saveInfo} className="reviewForm">
            <textarea
              value={text}
              rows={ 5 }
              placeholder="Enter a Review"
              onChange={event => setText(event.target.value)}
            ></textarea>
            <div>
            Stars: <input 
              value={rating}
              type="number" 
              id="quantity" 
              name="quantity" 
              min="1" 
              max="5"
              placeholder= "?"
              onChange={event => setRating(event.target.value)}
            />
            </div>
            <button type='submit' disabled={ !text || !rating }>Add Review</button>
        </form>
        </div>
        )
    
};

export default CreateReviews;