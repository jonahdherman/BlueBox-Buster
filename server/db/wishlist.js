const { response } = require('express');
const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchWishListItems = async(userId)=> {
  const SQL = `
    SELECT wishList_items.* 
    FROM
    wishList_items
    JOIN wishLists
    ON wishLists.id = wishList_items.wishList_id
    JOIN users
    ON users.id = wishLists.user_id
    WHERE wishLists.id = $1
    ORDER BY product_id
  `;
  const response = await client.query(SQL, [ userId ]);
  return response.rows;
};

const fetchAllWishListItems = async()=> {
  const SQL = `
    SELECT wishList_items.* 
    FROM
    wishList_items
    JOIN wishLists
    ON wishLists.id = wishList_items.wishList_id
    JOIN users
    ON users.id = wishLists.user_id
    ORDER BY product_id
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const ensureWishList = async(wishListItem)=> {
  let wishListId = wishListItem.wishList_id;
  if(!wishListId){
    const SQL = `
      SELECT wishList_id 
      FROM wishList_items 
      WHERE id = $1 
    `;
    const response = await client.query(SQL, [wishListItem.id]);
    wishListId = response.rows[0].wishList_id;
  }
  const SQL = `
    SELECT * 
    FROM wishLists
    WHERE id = $1 and is_wishList=true
  `;
  const response = await client.query(SQL, [wishListId]);
  // if(!response.rows.length){
  //   throw Error("An order which has been placed can not be changed");
  // }
};

const updateWishListItem = async(wishListItem)=> {
  await ensureWishList(wishListItem);
  SQL = `
    UPDATE wishList_items
    SET quantity = $1
    WHERE id = $2
    RETURNING *
  `;
  if(wishListItem.quantity <= 0){
    throw Error('a wishlist item quantity must be greater than 0');
  }
  const response = await client.query(SQL, [wishListItem.quantity, wishListItem.id]);
  return response.rows[0];
};

const createWishListItem = async(wishListItem)=> {
  await ensureWishList(wishListItem);
  const SQL = `
  INSERT INTO wishList_items (product_id, wishList_id, id) VALUES($1, $2, $3) RETURNING *
`;
 response = await client.query(SQL, [ wishListItem.product_id, wishListItem.wishList_id, uuidv4()]);
  return response.rows[0];
};

const deleteWishListItem = async(wishListItem)=> {
  await ensureWishList(wishListItem);
  const SQL = `
    DELETE from wishList_items
    WHERE id = $1
  `;
  await client.query(SQL, [wishListItem.id]);
};

const updateWishList = async(wishList) => {
  const SQL = `
  UPDATE wishLists SET is_wishList = $1 WHERE id = $2 RETURNING *
  `;
  const response = await client.query(SQL, [wishList.is_wishList, wishList.id]);
  return response.rows[0];
};

const fetchWishLists = async(userId) => {
  const SQL = `
    SELECT * FROM wishLists
    WHERE user_id = $1
  `;
  let response = await client.query(SQL, [userId]);
  const wishList = response.rows.find(row => row.is_wishList);
  if(!wishList) {
    await client.query(`
      INSERT INTO wishLists(is_wishList, id, user_id) VALUES(true, $1, $2)
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
    SELECT * FROM wishLists
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
