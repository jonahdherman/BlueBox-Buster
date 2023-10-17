import React from 'react';

const Bookmarks = ({ products, bookmarks }) => {
    
    return (
        <div>
        <h2>Bookmarks</h2>
        <ul>
        {
            bookmarks.map(bookmark =>{
                return(
                  <li key={bookmark.id}>
                    { bookmark.id  }
                    <br />
                    { bookmark.user_id }
                    <br />
                    { bookmark.product_id }
                  </li>
                )
            })
        }
        </ul>
        </div>
        )
};

export default Bookmarks;