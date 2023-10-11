import React from 'react';

const List = ({updateWishList, removeFromWishList, lineItems, list, products, increaseQuantity, decreaseQuantity}) => {
    if(!products.length) {
        return null;
    }
    return(
        <div>
            <h2>Wish List</h2>
            <ul>
                {
                    lineItems.filter(lineItem => lineItem.wishlist_id === list.id).map( lineItem => {
                        const product = products.find(product => product.id === lineItem.product_id) || {};
                        return (
                            <li key={lineItem.id}>
                                {product.name}
                                ({lineItem.quantity})
                                <button onClick={ () => removeFromWishList(lineItem)}>Remove From Wish List</button>
                            </li>
                        );
                    })
                }
            </ul>
            {
                lineItems.filter(lineItem => lineItem.order_id === list.id).length ? <button onClick={() => {
                    updateWishList({...list, is_wishList:false });
                }}>Create List Item</button>: null
            }
        </div>
    );
};

export default List;