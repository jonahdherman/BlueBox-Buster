import React from 'react';

const List = ({updateWishList, removeFromWishList, wishListItems, list, products, increaseQuantity, decreaseQuantity}) => {
    let totalPrice = 0;
    wishListItems.forEach(lineItem => {
        const product = products.find(product => product.id === wishListItem.product_id)
        totalPrice += product.price * lineItem.quantity
    })
    
    if(!products.length) {
        return null;
    }
    return(
        <div>
            <h2>Wish List</h2>
            <ul>
                {
                    wishListItems.filter(wishListItem => wishListItem.wishlist_id === wishlist.id).map( wishListItem => {
                        const product = products.find(product => product.id === wishListItem.product_id) || {};
                        return (
                            <li key={wishListItem.id}>
                                {product.name}
                                ({wishListItem.quantity})
                                <button onClick={ () => removeFromWishList(wishListItem)}>Remove From Wish List</button>
                            </li>
                        );
                    })
                }
            </ul>
            {
                wishListItems.filter(wishListItem => wishListItem.wishlist_id === wishlist.id).length ? <button onClick={() => {
                    updateWishList({...list, is_wishList:false });
                }}>Create Wish List Item</button>: null
            }
        </div>
    );
};

export default List;