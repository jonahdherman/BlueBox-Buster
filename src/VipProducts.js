import React from "react";
import { Link } from "react-router-dom"; 
import ProductImageEditor from "./ProductImageEditor";

const VipProducts = ({ products, cartItems, createLineItem, updateLineItem, auth, updateProduct, term }) => {

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
                                        <br />
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