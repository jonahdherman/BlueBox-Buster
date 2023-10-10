import React from 'react';
import { Link } from 'react-router-dom';
import CreateProduct from './CreateProduct';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, createProduct })=> {
  
  const nonVip = products.filter( product => product.vip_only === false)
  const yesVip = products.filter( product => product.vip_only === true)
  const both = nonVip.concat(yesVip)
  let all = []
  
  {
  auth.is_vip === false ? all = nonVip : all = both
  }
  
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
         
         
          
          
          all.map( product => {
            
            
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            
            return (
              <li key={ product.id }>
                {
                  product.image ? <img src={ product.image } /> : null
                } 
                 <br/>
                <Link to={`/products/${product.id}`}>
                  {`${ product.name }`}
                </Link>
                {`: $${(product.price / 100).toFixed(2)}`}
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
