import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductImageEditor from "./ProductImageEditor";
import WishList from './WishList';
import NonVipPagination from "./NonVipPagination";

const NonVipProducts = ({ products, cartItems, createLineItem, updateLineItem, auth, updateProduct, term, tags, tag_lines, wishLists, addWishList, removeWishList }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);

    const nonVip = products.filter(product => product.vip_only === false)

    const totalPages = Math.ceil(nonVip.length / productsPerPage);
    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    const currentProducts = nonVip.slice(firstProductIndex, lastProductIndex);

    const assignVIP = (product) => {
        const vipProduct = { ...product, vip_only: true }
        updateProduct(vipProduct);
    }

    const [bookmark, setBookmark] = useState(true);

    const handleChange = () => {
        //setBookmark(!bookmark)
    };

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
                            const cutOff = product.description.toString().slice(0, 250)
                            return (
                                <div key={product.id} className="productsCard">
                                    {
                                        auth.id ?
                                            <div><button disabled={false} onClick={handleChange} >Bookmark Item</button></div>
                                            : null
                                    }
                                    {
                                        product.image ? <img src={product.image} /> : null
                                    }
                                    <h3>{product.name}</h3>
                                    <h4>{`$${(product.price / 100).toFixed(2)}`}</h4>

                                    <p>{auth.is_admin ? <Link to={'/tags/edit'}> Edit tags</Link> : null}</p>
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

                                    <p>{`${cutOff}...`}<Link to={`/products/${product.id}`}>{`Read More`}</Link></p>

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
                                            <button onClick={() => assignVIP(product)}>Remove VIP only</button>
                                            <ProductImageEditor product={product} updateProduct={updateProduct} />
                                        </div>
                                    )
                                        : null
                                    }
                                </div>
                            );
                        })
                }
            </div>
            <NonVipPagination
                totalProducts={nonVip.length}
                productsPerPage={productsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default NonVipProducts;