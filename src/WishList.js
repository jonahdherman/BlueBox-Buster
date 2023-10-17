import React from "react";
import Products from './Products';
import Link from 'react-router-dom';


const WishList = ({products, wishLists, addWishList, removeWishList}) => {
    
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
                return (
                    <li key={ wishList.id }>
                        { product.name } ({ wishList.quantity } x ${ (product.price / 100).toFixed(2) })
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