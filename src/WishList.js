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
      <div className="container">
        <div className="mainPage wishListPage">
          <h1>Wish List</h1>
          <ul>
          {
            wishLists.map( wishList => {
              const product = products.find(product => product.id === wishList.product_id) || {};
              const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
              return (
                      <li key={ wishList.id }>
                          <h3>{ product.name } ({ wishList.quantity }${(product.price / 100).toFixed(2) }) : {" "}</h3>
                          <div className="wishListDetails">
                          <img src={product.image}/>
                            <div className="wishListButtons">
                            { cartItem ? 'Already In Your Cart' : <img src='/assets/addToCart.png' title="Add to Cart" onClick={() => createLineItem(product)}/> }
                            <img src='/assets/removeWishList.png' title='Remove from Wish List' onClick={ ()=> removeWishList(wishList)}/>
                          </div>
                          </div>
                        {/* <button>Priority?</button> */}
                      </li>
                );    
            })
          }
        </ul>
        </div>
      </div>
    )
}

export default WishList;