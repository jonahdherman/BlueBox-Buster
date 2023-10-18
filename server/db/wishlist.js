const { response } = require('express');
const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchWishList = async(userId) => {
  const SQL = `
    SELECT * FROM wishlist_items
    WHERE user_id = $1
  `;
  const response = await client.query(SQL, [userId]);
  return response.rows;
};

const fetchAllWishLists = async(userId) => {
  const SQL = `
    SELECT * FROM wishlist_items
  `;
  const response = await client.query(SQL, []);
  return response.rows;
};

const createWishList = async(wishlist)=> {
  const SQL = `
  INSERT INTO wishlist_items (product_id, user_id, id) VALUES($1, $2, $3) RETURNING *
`;
  const response = await client.query(SQL, [ wishlist.product_id, wishlist.user_id, uuidv4()]);
  return response.rows[0];
};

const removeWishList = async(wishlist)=> {
  const SQL = `
    DELETE from wishlist_items
    WHERE id = $1 AND user_id = $2
  `;
  await client.query(SQL, [wishlist.id, wishlist.user_id]);
};

module.exports = {
    fetchWishList,
    fetchAllWishLists,
    createWishList,
    removeWishList,
  };
