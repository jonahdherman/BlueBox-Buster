import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductImageEditor from "./ProductImageEditor";
import WishList from './WishList';

const NonVipProducts = ({ products, cartItems, createLineItem, updateLineItem, wishLists, addWishList, removeWishList, auth, updateProduct, term, tags, tag_lines }) => {
    // if(!wishLists.length) {
    //     return null;
    //   }
    const nonVip = products.filter(product => product.vip_only === false)
    const [bookmark, setBookmark] = useState(true);

    const assignVIP = (product) => {
        const vipProduct = { ...product, vip_only: true }
        updateProduct(vipProduct);
    }
    
    const handleChange = () => { 
        //setBookmark(!bookmark)
        //console.log(bookmark)
    
    
      }; 

    return (
        <div>
            <ul>
                {
                    nonVip
                        .filter(product => !term || product.name.toLowerCase().includes(term.toLowerCase()))
                        .map(product => {
                            const productLines = tag_lines.filter(tag_line => tag_line.product_id === product.id);
                            const productTags = productLines.map(line => tags.find(tag => tag.id === line.tag_id));
                            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
                            const cutOff = product.description.toString().slice(0, 250)
                            return (
                                <li key={product.id}>
                                    {
                                           auth.id ?
                                            <div><button disabled={ true } onClick={ handleChange } >Bookmark Item</button></div> 
                                            : null
                                        }
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
                                                        return (
                                                            <li key={tag.id}>{tag.name}</li>
                                                        );
                                                    })
                                                }
                                            </ul> : <p>None</p>
                                    }

                                    {`${cutOff}...`}
                                    <Link to={`/products/${product.id}`}>
                                        {`Read More`}
                                    </Link>
                                    <br />
                                    {
                                        auth.id ? (
                                            cartItem ? <button onClick={() => updateLineItem(cartItem)}>Add Another</button> : <button onClick={() => createLineItem(product)}>Add</button>
                                        ) : null
                                    }

                                    {/* {
                                        auth.id ? <WishList product = { product } wishList = {wishLists.find(wishlist => wishlist.product_id === product.id)} addWishList= {addWishList} removeWishList={removeWishList}/>: null
                                    } */}
                                    {

                                        auth.is_admin ? (
                                            <div>
                                                <Link to={`/products/${product.id}/edit`}>Edit</Link><br />
                                                <button onClick={() => assignVIP(product)}>Assign VIP only</button>
                                                <ProductImageEditor product={product} updateProduct={updateProduct} />
                                            </div>
                                        ) : null
                                    }
                                    {
                                            auth.id && wishLists.length ? <WishList product = {product} wishLists = 
                                            {wishLists.find(wishlist => wishlist.product_id === product.id)}
                                            addWishList = {addWishList} removeWishList={removeWishList}/>: null
                                    }
                                </li>
                            );
                        })
                }
            </ul>
        </div>
    );
}

export default NonVipProducts;