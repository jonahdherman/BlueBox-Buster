const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;



const fetchProducts = async()=> {
  const SQL = `
    SELECT *
    FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createProduct = async(product)=> {
  const SQL = `
    INSERT INTO products (id, name, price, description, image, vip_only, is_bookmarked) 
    VALUES($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), product.name, product.price, product.description, product.image || null, product.vip_only, product.is_bookmarked]);

  return response.rows[0];
};

const updateProduct = async(product)=> {
  const SQL = `
    UPDATE products 
    SET name=$1, price=$2, description=$3, image=$4, vip_only=$5, is_bookmarked=$6 
    WHERE id=$7
    RETURNING *
  `;
  const response = await client.query(SQL, [ product.name, product.price, product.description, product.image, product.vip_only, product.is_bookmarked, product.id ]);
  return response.rows[0];
};

module.exports = {
  fetchProducts,
  createProduct,
  updateProduct
};
