import React from "react";


const WishList = ({product, wishLists, addWishList, removeWishList}) => {
    return (
      <div>
        {
          wishLists ? <button onClick={() => removeWishList(wishLists)}>Remove from Wish List</button> : 
          <button onClick={() => addWishList({product_id: product.id})}>Add to Wish List</button>
        }
      </div>
    )
}

export default WishList;