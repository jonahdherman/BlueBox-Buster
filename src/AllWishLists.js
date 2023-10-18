import React from "react";


const AllWishLists = ({ allWishLists, users, products }) => {
    const wishListUsers = users.filter(user => allWishLists.find(list => list.user_id === user.id))
        .sort((a, b) => a.username.localeCompare(b.username));
    
    return(
        <div>
            <h1>All Users Wishlists</h1>
            <ul>
                {
                    wishListUsers.map(user => {
                        return(
                            <li key={user.id}>
                                <h4>{user.username}</h4>
                                <ul>
                                    {
                                        allWishLists.filter(list => list.user_id === user.id)
                                        .map(listItem => products.find(product => product.id === listItem.product_id))
                                        .map(userItem => {
                                            if (!userItem) {
                                                return null
                                            }
                                            return(
                                                <li key={userItem.id}>
                                                   {userItem.name}
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default AllWishLists;