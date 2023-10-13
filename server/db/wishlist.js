const { response } = require('express');
const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchWishListItems = async(userId)=> {
  const SQL = `
    SELECT wishlist_items.* 
    FROM
    wishlist_items
    JOIN wishlists
    ON wishlists.id = wishlist_items.wishlist_id
    JOIN users
    ON users.id = wishlists.user_id
    WHERE wishlists.id = $1
    ORDER BY product_id
  `;
  const response = await client.query(SQL, [ userId ]);
  return response.rows;
};

const fetchAllWishListItems = async()=> {
  const SQL = `
    SELECT wishlist_items.* 
    FROM
    wishlist_items
    JOIN wishlists
    ON wishlists.id = wishlist_items.wishlist_id
    JOIN users
    ON users.id = wishlists.user_id
    ORDER BY product_id
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const ensureWishList = async(wishlistItem)=> {
  let wishlistId = wishlistItem.wishlist_id;
  if(!wishlistId){
    const SQL = `
      SELECT wishlist_id 
      FROM wishlist_items 
      WHERE id = $1 
    `;
    const response = await client.query(SQL, [wishlistItem.id]);
    wishlistId = response.rows[0].wishlist_id;
  }
  const SQL = `
    SELECT * 
    FROM wishlists
    WHERE id = $1 and is_wishlist=true
  `;
  const response = await client.query(SQL, [wishlistId]);
  // if(!response.rows.length){
  //   throw Error("An order which has been placed can not be changed");
  // }
};

const updateWishListItem = async(wishlistItem)=> {
  await ensureWishList(wishlistItem);
  SQL = `
    UPDATE wishlist_items
    SET quantity = $1
    WHERE id = $2
    RETURNING *
  `;
  if(wishlistItem.quantity <= 0){
    throw Error('a wishlist item quantity must be greater than 0');
  }
  const response = await client.query(SQL, [wishlistItem.quantity, wishlistItem.id]);
  return response.rows[0];
};

const createWishListItem = async(wishlistItem)=> {
  await ensureWishList(wishlistItem);
  const SQL = `
  INSERT INTO wishlist_items (product_id, wishlist_id, id) VALUES($1, $2, $3) RETURNING *
`;
 response = await client.query(SQL, [ wishlistItem.product_id, wishlistItem.wishlist_id, uuidv4()]);
  return response.rows[0];
};

const deleteWishListItem = async(wishlistItem)=> {
  await ensureWishList(wishlistItem);
  const SQL = `
    DELETE from wishlist_items
    WHERE id = $1
  `;
  await client.query(SQL, [wishlistItem.id]);
};

const updateWishList = async(wishlist) => {
  const SQL = `
  UPDATE wishlists SET is_wishlist = $1 WHERE id = $2 RETURNING *
  `;
  const response = await client.query(SQL, [wishlist.is_wishlist, wishlist.id]);
  return response.rows[0];
};

const fetchWishLists = async(userId) => {
  const SQL = `
    SELECT * FROM wishlists
    WHERE user_id = $1
  `;
  let response = await client.query(SQL, [userId]);
  const wishlist = response.rows.find(row => row.is_wishlist);
  if(!wishlist) {
    await client.query(`
      INSERT INTO wishlists(is_wishlist, id, user_id) VALUES(true, $1, $2)
    `,
    [uuidv4(), userId]
    );
    response = await client.query(SQL, [ userId ]);
    return response.rows;
  }
  return response.rows;
};

const fetchAllWishLists = async() => {
  const SQL = `
    SELECT * FROM wishlists
  `;
  let response =await client.query(SQL);
    return response.rows;
}

module.exports = {
    fetchWishListItems,
    fetchAllWishListItems,
    createWishListItem,
    updateWishListItem,
    deleteWishListItem,
    updateWishList,
    fetchWishLists,
    fetchAllWishLists
  };
