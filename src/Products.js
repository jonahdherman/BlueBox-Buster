import React from 'react';
import { Link } from 'react-router-dom';
import CreateProduct from './CreateProduct';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, createProduct })=> {
  console.log(products)
  console.log(auth)
  return (
    <div>
      <h2>Products</h2>
      {
        auth.is_admin ? (
          <CreateProduct createProduct={createProduct}/>
        ) : null
      }
      <ul>
        {
          products.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ product.id }>
                {`${ product.name }: $${(product.price / 100).toFixed(2)}`}
                <br></br>
                {`${ product.description }`}
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  ): null
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
