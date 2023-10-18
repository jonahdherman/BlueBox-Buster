import React from "react";

const WishList = ({products, wishLists, removeWishList, createLineItem, cartItems}) => {
    
    if(!wishLists.length) {
        return (
            <div>
                <h1>Wish List</h1>
                <ul>Your Wish List is Empty! Add a Product</ul>
            </div>
        )
    }
    return (
      <div>
        <h1>Wish List</h1>
        <ul>
        {
          wishLists.map( wishList => {
            const product = products.find(product => product.id === wishList.product_id) || {};
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
                    
            return (
                    <li key={ wishList.id }>
                        { product.name } ({ wishList.quantity } x ${ (product.price / 100).toFixed(2) }) : {" "}
                        { cartItem ? "Already In Your Cart" : <button onClick={() => createLineItem(product)}>Add to Cart</button> }
                        <br></br>
                        <button>Priority?</button>
                        <button onClick={ ()=> removeWishList(wishList)}>Remove From Wish List</button>
                    </li>
              );    
          })
        }
      </ul>
      </div>
    )
}

export default WishList;