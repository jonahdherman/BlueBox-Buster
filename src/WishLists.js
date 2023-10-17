import React from "react";
import { Link } from "react-router-dom";

const DeleteWishList = ({product, wishLists, addWishList, removeWishList}) => {
    return (
      <div>
        {
          wishLists ? <button onClick={() => removeWishList(wishLists)}>Remove from Wish List</button>: null
        }
      </div>
    )
  }

const WishLists = ({products, wishLists, removeWishList}) => {

    if(!wishLists){
        return null
      }
    return (
       <div>
        { wishLists.length === 0 ? <>
        <h2>Add some products to your WishList!</h2>
        <Link to='/products'>All Products</Link>
        </> : <>
            <h2>Your Wish List</h2>
            {
              wishLists.map((wishlist) => {
                const product = products.find(product => product.id === wishlist.product_id);
                return (
                  <div key={wishlist.id}>
                      <h4><Link to={`/products:${product.id}`}>{product.name}</Link></h4>
                      <img src={product.image} />
                      <div><Link to={`/products:${product.id}`}>Product Page</Link></div>
                      <DeleteWishList product= { product } wishList = {wishLists.find(wishlist => wishlist.product_id === product.id)} removeWishList= { removeWishList } />
                  </div>
                )
              })
            }
          </>}
       </div>
    )
}

export default WishLists;