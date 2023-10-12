import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CreateProduct from './CreateProduct';
import ProductImageEditor from './ProductImageEditor';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, createProduct, updateProduct }) => {
  const navigate = useNavigate();
  const { term } = useParams();
  
  const nonVip = products.filter(product => product.vip_only === false)
  const yesVip = products.filter(product => product.vip_only === true)

  const assignVIP = (product)=> {
    const vipProduct = {...product, vip_only: true}
    updateProduct(vipProduct);
  }

  const removeVIP = (product)=> {
    const vipProduct = {...product, vip_only: false}
    updateProduct(vipProduct);
  }

  return (
    <div>
      <h2>Products</h2>
      <input placeholder='search for products' value = { term || ''} onChange = { ev => 
        navigate(ev.target.value ? `/products/search/${ev.target.value}` : '/products')}/>
      {
        auth.is_admin ? (
          <CreateProduct createProduct={createProduct} />

        ) : null
      }
      {
        auth.is_vip || auth.is_admin ? (
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
                      {  auth.is_admin ? (
                        <div>
                        <Link to={`/products/${product.id}/edit`}>Edit</Link><br />
                        <button onClick={() => removeVIP(product)}>Remove VIP only</button>
                        <ProductImageEditor product={ product } updateProduct={ updateProduct }/>
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
        ) : null
      }
      {auth.is_vip || auth.is_admin ? <h2>Standard Products</h2> : <h2>All Products</h2>}
      <ul>
        {
          nonVip
            .filter(product => !term || product.name.toLowerCase().includes(term.toLowerCase()))
            .map(product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            const cutOff = product.description.toString().slice(0, 250)
            //console.log(cartItems);

            const wishListItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            //console.log(wishListItems);

            //{wishListItem ? }
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
                {
                  auth.id ? (
                    wishListItem ? <button onClick={ () => updateLineItem(wishListItem)}>Add Another To Wish List</button>: 
                    <button onClick={ () => createLineItem(product)}>Add To Wish List</button>
                  ):  null
                }
                {
                  auth.is_admin ? (
                    <div>
                        <Link to={`/products/${product.id}/edit`}>Edit</Link><br />
                        <button onClick={() => assignVIP(product)}>Assign VIP only</button>
                        <ProductImageEditor product={ product } updateProduct={ updateProduct }/>
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
};

export default Products;
