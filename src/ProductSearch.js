import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductImageEditor from "./ProductImageEditor";


const ProductSearch = ({ products, cartItems, createLineItem, updateLineItem, auth, createProduct, updateProduct, wishLists, addWishList, removeWishList, tags, tag_lines, bookmarks, createBookmark, removeBookmark }) => {
    const navigate = useNavigate();
    const { term } = useParams();

    const yesVip = products.filter(product => product.vip_only === true);
    const nonVip = products.filter(product => product.vip_only === false);

    const assignVIP = (product) => {
        const vipProduct = { ...product, vip_only: true }
        updateProduct(vipProduct);
    }

    const removeVIP = (product)=> {
        const vipProduct = {...product, vip_only: false}
        updateProduct(vipProduct);
    }

    return(
        <div>
            <div className="searchbar">
                <h2>Search For Products</h2>
                <input placeholder='search for products' value = { term || ''} onChange = { ev => 
                navigate(ev.target.value ? `/products/search/${ev.target.value}` : '/products/search')}/>
            </div>
            {
                auth.is_vip ? (
                    <div className="productsPage">
                    <h2>VIP Exclusives!</h2>
                    <div className="productsContainer">
                        {
                            yesVip
                                .filter(product => !term || product.name.toLowerCase().includes(term.toLowerCase()))
                                .map(product => {
                                    const productLines = tag_lines.filter(tag_line => tag_line.product_id === product.id);
                                    const productTags = productLines.map(line => tags.find(tag => tag.id === line.tag_id));
                                    const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
                                    const bookmark = bookmarks.find(bookmark => bookmark.product_id === product.id );
                                    const cutOff = product.description.toString().slice(0, 250)
                                    return (
                                        <div key={product.id} className="productsCard">
                                            <div id='productButtons'>
                                                {
                                                  bookmark ? <img id='bookmarkIcon' src='/assets/bkmrkF.png' title={'Remove Bookmark'} onClick={ ()=> removeBookmark(bookmark)}/> 
                                                  : <img id='bookmarkIcon' src='/assets/bkmrkE.png' title={'Add Bookmark'} onClick={ ()=> createBookmark({product_id: product.id, user_id: auth.id})} />
                                                }
                                                {
                                                wishLists.find(wishlist => wishlist.product_id === product.id) ? <img id='wishListIcon' src='/assets/removeWishList.png' title={'Remove from Wishlist'} onClick={() => removeWishList(wishLists.find(wishlist => wishlist.product_id === product.id))}/> : 
                                                <img id='wishListIcon' src='/assets/addWishList.png' title={'Add to Wishlist'} onClick={() => addWishList({product_id: product.id})}/>
                                                }
                                                {
                                                auth.id ? (
                                                    cartItem ? <img id='cartIcon' src='/assets/addAnotherToCart.png' title={'Add Another to Cart'} onClick={() => updateLineItem(cartItem)}/> 
                                                    : <img id='cartIcon' src='/assets/addToCart.png' title={'Add to Cart'} onClick={() => createLineItem(product)}/>
                                                ) : null
                                                }
                                                {
                                                auth.is_admin ? <img id='ticketIcon' src='/assets/ticketRemove.png' title={'Remove VIP Exclusive'} onClick={() => removeVIP(product)}/> : null    
                                                }
                                            </div>
                                            <h2>{product.name}</h2>
                                            {
                                                product.image ? <img src={product.image} /> : null
                                            }
                                            <div className="priceAndTags">
                                            <h4>{`$${(product.price / 100).toFixed(2)}`}</h4>
                                            {productTags.length ?
                                                <ul>
                                                    {
                                                        productTags.map(tag => {
                                                            return (
                                                                <li key={tag.id}>{tag.name}</li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                                : <p>No</p>}
                                            </div>
                                            <p>{`${cutOff}... `}<Link to={`/products/${product.id}`} className='readMore'>{`Read More`}</Link></p>
                                            
                                            {auth.is_admin ? (
                                                <div className="adminOptions">
                                                    <p>Admin</p>
                                                    <div>
                                                        <Link to={`/products/${product.id}/edit`}>Edit Product</Link><br />
                                                        <Link to={'/tags/edit'}>Edit tags</Link>
                                                        <ProductImageEditor product={product} updateProduct={updateProduct} />
                                                    </div>
                                                </div>
                                            )
                                                : null
                                            }
        
                                        </div>
                                    );
                                })
                        }
                    </div>
                </div>
                ) : null
            }
            <div className="productsPage">
            {auth.is_vip || auth.is_admin ? <h2>Standard Products</h2> : <h2>All Products</h2>}
            <div className="productsContainer">
                {
                    nonVip
                        .filter(product => !term || product.name.toLowerCase().includes(term.toLowerCase()))
                        .map(product => {
                            const productLines = tag_lines.filter(tag_line => tag_line.product_id === product.id);
                            const productTags = productLines.map(line => tags.find(tag => tag.id === line.tag_id));
                            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);

                            const cutOff = product.description.toString().slice(0, 250)
                            const bookmark = bookmarks.find(bookmark => bookmark.product_id === product.id );
                            return (
                                <div key={product.id} className="productsCard">
                                    { auth.id ? 
                                        <div id='productButtons'>
                                        {
                                          bookmark ? <img id='bookmarkIcon' src='/assets/bkmrkF.png' title={'Remove Bookmark'} onClick={ ()=> removeBookmark(bookmark)}/> 
                                          : <img id='bookmarkIcon' src='/assets/bkmrkE.png' title={'Add Bookmark'} onClick={ ()=> createBookmark({product_id: product.id, user_id: auth.id})} />
                                        }
                                        {
                                            wishLists.find(wishlist => wishlist.product_id === product.id) ? 
                                            <img id='wishListIcon' src='/assets/removeWishList.png' title={'Remove from Wishlist'} onClick={() => removeWishList(wishLists.find(wishlist => wishlist.product_id === product.id))}/> 
                                            : <img id='wishListIcon' src='/assets/addWishList.png' title={'Add to Wishlist'} onClick={() => addWishList({product_id: product.id})}/>
                                        }
                                        {
                                                cartItem ? <img id='cartIcon' src='/assets/addAnotherToCart.png' title={'Add Another to Cart'} onClick={() => updateLineItem(cartItem)}/> 
                                                : <img id='cartIcon' src='/assets/addToCart.png' title={'Add to Cart'} onClick={() => createLineItem(product)}/>
                                        }
                                        {
                                        auth.is_admin ? <img id='ticketIcon' src='/assets/ticketAdd.png' title={'Make VIP Exclusive'} onClick={() => assignVIP(product)}/> : null    
                                        }
                                    </div> :null
                                }
                                    
                                    <h2>{product.name}</h2>
                                    
                                    {
                                        product.image ? <img src={product.image} /> : null
                                    }
                                    <div className="priceAndTags">
                                        <h4>{`$${(product.price / 100).toFixed(2)}`}</h4>
                                        {productTags.length ?
                                            <ul>
                                                {
                                                    productTags.map(tag => {
                                                        return (
                                                            <li key={tag.id}>{tag.name}</li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                            : <p>None</p>}
                                    </div>
                                    <p>{`${cutOff}... `}<Link to={`/products/${product.id}`} className='readMore'>{`Read More`}</Link></p>

                                    {auth.is_admin ? (
                                       <div className="adminOptions">
                                            <p>Admin</p>
                                            <div>
                                                <Link to={`/products/${product.id}/edit`}>Edit Product</Link><br />
                                                <Link to={'/tags/edit'}> Edit tags</Link>
                                                <ProductImageEditor product={product} updateProduct={updateProduct} />
                                            </div>
                                        </div>
                                    )
                                        : null
                                    }
                                    
                                </div>
                            );
                        })
                }
            </div>
        </div>
        </div>
    );
}

export default ProductSearch;
