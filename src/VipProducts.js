import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductImageEditor from "./ProductImageEditor";
import WishList from './WishList';
import VipPagination from "./VipPagination";



const VipProducts = ({ products, cartItems, createLineItem, updateLineItem, wishLists, addWishList, removeWishList, auth, updateProduct, term, tags, tag_lines, bookmarks, createBookmark, removeBookmark }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(1);
    const yesVip = products.filter(product => product.vip_only === true);
    const totalPages = Math.ceil(yesVip.length / productsPerPage);
    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    const currentProducts = yesVip.slice(firstProductIndex, lastProductIndex);

    const removeVIP = (product)=> {
        const vipProduct = {...product, vip_only: false}
        updateProduct(vipProduct);
    }

    return (
        <div className="productsPage">
            <div className="productsContainer">
                {
                    currentProducts
                        .filter(product => !term || product.name.toLowerCase().includes(term.toLowerCase()))
                        .map(product => {
                            const productLines = tag_lines.filter(tag_line => tag_line.product_id === product.id);
                            const productTags = productLines.map(line => tags.find(tag => tag.id === line.tag_id));
                            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
                            const bookmark = bookmarks.find(bookmark => bookmark.product_id === product.id );
                            const cutOff = product.description.toString().slice(0, 250)
                            return (
                                <div key={product.id} className="productsCard">
                                    <h3>{product.name}</h3>
                                        {
                                          bookmark ? <h4>Bookmarked!<button onClick={ ()=> removeBookmark(bookmark)}>Remove Bookmark</button></h4> : <button onClick={ ()=> createBookmark({product_id: product.id, user_id: auth.id})}>Add Bookmark</button>
                                        }
                                    {
                                        product.image ? <img src={product.image} /> : null
                                    }
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

                                    <p>{`${cutOff}...`}<Link to={`/products/${product.id}`}>{`Read More`}</Link></p>

                                    {
                                        auth.id ? (
                                            cartItem ? <button onClick={() => updateLineItem(cartItem)}>Add Another</button> : <button onClick={() => createLineItem(product)}>Add</button>
                                        ) : null
                                    }
                                    
                                    {auth.is_admin ? (
                                        <div>
                                            <Link to={`/products/${product.id}/edit`}>Edit Product</Link><br />
                                            <button onClick={() => removeVIP(product)}>Remove VIP only</button>
                                            <Link to={'/tags/edit'}>Edit tags</Link>
                                            <ProductImageEditor product={product} updateProduct={updateProduct} />
                                        </div>
                                    )
                                        : null
                                    }
                                    {
                                        wishLists.find(wishlist => wishlist.product_id === product.id) ? <button onClick={() => removeWishList(wishLists.find(wishlist => wishlist.product_id === product.id))}>Remove from Wish List</button> : 
                                        <button onClick={() => addWishList({product_id: product.id})}>Add to Wish List</button>
                                    }

                                </div>
                            );
                        })
                }
            </div>
            <VipPagination
                totalProducts={yesVip.length}
                productsPerPage={productsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default VipProducts;