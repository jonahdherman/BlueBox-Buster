import React from "react";
import { Link } from "react-router-dom";
import ProductImageEditor from "./ProductImageEditor";

const NonVipProducts = ({ products, cartItems, createLineItem, updateLineItem, auth, updateProduct, term, tags, tag_lines }) => {

    const nonVip = products.filter(product => product.vip_only === false)

    const assignVIP = (product) => {
        const vipProduct = { ...product, vip_only: true }
        updateProduct(vipProduct);
    }

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
                                        product.image ? <img src={product.image} /> : null
                                    }
                                    <br />
                                    {`${product.name}`}
                                    {`: $${(product.price / 100).toFixed(2)}`}
                                    { productTags.length ?
                                        <div>
                                            <p>tags</p>
                                            <ul>
                                                {
                                                    productTags.map(tag => {
                                                        return (
                                                            <li key={tag.id}>{tag.name}</li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </div> : <p>No tags</p>
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
                                    {
                                        auth.is_admin ? (
                                            <div>
                                                <Link to={`/products/${product.id}/edit`}>Edit</Link><br />
                                                <button onClick={() => assignVIP(product)}>Assign VIP only</button>
                                                <ProductImageEditor product={product} updateProduct={updateProduct} />
                                            </div>
                                        ) : null
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