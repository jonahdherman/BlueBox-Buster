import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import ProductImageEditor from "./ProductImageEditor";


const VipProducts = ({ products, cartItems, createLineItem, updateLineItem, createWishListItem, updateWishListItem, wishListItems, removeFromWishList, auth, updateProduct, term, tags, tag_lines, bookmarks, createBookmark, removeBookmark }) => {
  
    
    const yesVip = products.filter(product => product.vip_only === true);
    
    const removeVIP = (product)=> {
        const vipProduct = {...product, vip_only: false}
        updateProduct(vipProduct);
      }
      

    return (
        <div>
            <div>
                <h2>Vip Exclusive!</h2>
                <ul>
                    {
                        yesVip
                            .filter(product => !term || product.name.toLowerCase().includes(term.toLowerCase()))
                            .map(product => {
                                const productLines = tag_lines.filter(tag_line => tag_line.product_id === product.id);
                                const productTags = productLines.map(line => tags.find(tag => tag.id === line.tag_id));
                                const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
                                const wishListItem = wishListItems.find(wishListItem => wishListItem.product_id === product.id);
                                const bookmark = bookmarks.find(bookmark => bookmark.product_id === product.id );
                                const cutOff = product.description.toString().slice(0, 250)
                                return (
                                    <li key={product.id}>
                                        {
                                          bookmark ? <h4>Bookmarked!<button onClick={ ()=> removeBookmark(bookmark)}>Remove Bookmark</button></h4> : <button onClick={ ()=> createBookmark({product_id: product.id, user_id: auth.id})}>Add Bookmark</button>
                                        }
                                        <br />
                                        {
                                            product.image ? <img src={product.image} /> : null
                                        }
                                        <br />
                                        {`${product.name}`}
                                        {`: $${(product.price / 100).toFixed(2)}`}
                                        
                                        <p>tags</p>
                                        { auth.is_admin ? <Link to={'/tags/edit'}>Edit tags</Link> : null }
                                        { productTags.length ? 
                                            <ul>
                                                {
                                                    productTags.map(tag => {
                                                        return(
                                                            <li key={tag.id}>{tag.name}</li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                                : <p>None</p>}
                                        
                                        {`${cutOff}...`}
                                        <Link to={`/products/${product.id}`}>
                                            {`Read More`}
                                        </Link>
                                        <br></br>
                                        {
                                            auth.id ? (
                                                cartItem ? <button onClick={() => updateLineItem(cartItem)}>Add Another</button> : <button onClick={() => createLineItem(product)}>Add</button>
                                            ) : null
                                        }
                                        {
                                            auth.id ? (
                                                wishListItem ? <button onClick={() => updateWishListItem(wishListItem)}>Remove From Wishlist</button> : <button onClick={() => createWishListItem(product)}>Add to Wishlist</button>
                                            ) : null
                                        }
                                        
                                        {auth.is_admin ? (
                                            <div>
                                                <Link to={`/products/${product.id}/edit`}>Edit</Link><br />
                                                <button onClick={() => removeVIP(product)}>Remove VIP only</button>
                                                <ProductImageEditor product={product} updateProduct={updateProduct} />
                                            </div>
                                        )
                                            : null
                                        }
                                    </li>
                                );
                            })
                    }
                </ul>
            </div>

        </div>
    );
}

export default VipProducts;