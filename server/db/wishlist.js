const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchWishListItems = async(userId)=> {
  const SQL = `
    SELECT wishList_items.* 
    FROM
    wishList_items
    JOIN wishlists
    ON wishlists.id = wishList_items.order_id
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
    SELECT wishList_items.* 
    FROM
    wishList_items
    JOIN wishlists
    ON wishlists.id = wishList_items.wishlists_id
    JOIN users
    ON users.id = orders.user_id
    ORDER BY product_id
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const ensureWishList = async(lineItem)=> {
  let orderId = lineItem.order_id;
  if(!orderId){
    const SQL = `
      SELECT order_id 
      FROM line_items 
      WHERE id = $1 
    `;
    const response = await client.query(SQL, [lineItem.id]);
    orderId = response.rows[0].order_id;
  }
  const SQL = `
    SELECT * 
    FROM orders
    WHERE id = $1 and is_wishList=true
  `;
  const response = await client.query(SQL, [orderId]);
  if(!response.rows.length){
    throw Error("An order which has been placed can not be changed");
  }
};
const updateWishListItem = async(lineItem)=> {
  await ensureWishList(lineItem);
  SQL = `
    UPDATE line_items
    SET quantity = $1
    WHERE id = $2
    RETURNING *
  `;
  if(lineItem.quantity <= 0){
    throw Error('a line item quantity must be greater than 0');
  }
  const response = await client.query(SQL, [lineItem.quantity, lineItem.id]);
  return response.rows[0];
};

const createWishListItem = async(lineItem)=> {
  await ensureWishList(lineItem);
  const SQL = `
  INSERT INTO line_items (product_id, order_id, id) VALUES($1, $2, $3) RETURNING *
`;
 response = await client.query(SQL, [ lineItem.product_id, lineItem.order_id, uuidv4()]);
  return response.rows[0];
};

const deleteWishListItem = async(lineItem)=> {
  await ensureWishList(lineItem);
  const SQL = `
    DELETE from line_items
    WHERE id = $1
  `;
  await client.query(SQL, [lineItem.id]);
};

const updateOrder = async(order)=> {
  const SQL = `
    UPDATE orders SET wishList = $1 WHERE id = $2 RETURNING *
  `;
  const response = await client.query(SQL, [order.wishList, order.id]);
  return response.rows[0];
};

const fetchOrders = async(userId)=> {
  const SQL = `
    SELECT * FROM orders
    WHERE user_id = $1
  `;
  let response = await client.query(SQL, [ userId ]);
  const wishList = response.rows.find(row => row.wishList);
  if(!wishList){
    await client.query(`
      INSERT INTO orders(wishList, id, user_id) VALUES(true, $1, $2)
      `,
      [uuidv4(), userId]
    ); 
    response = await client.query(SQL, [ userId ]);
    return response.rows;
    //return fetchOrders(userId);
  }
  return response.rows;
};

const fetchAllOrders = async()=> {
  const SQL = `
    SELECT * FROM orders
  `;
  let response = await client.query(SQL);
    return response.rows;
  }

    module.exports = {
        fetchWishListItems,
        fetchAllWishListItems,
        createWishListItem,
        updateWishListItem,
        deleteWishListItem,
        updateOrder,
        fetchOrders,
        fetchAllOrders
      };
// const createWishListItem = async(wishListItem) => {
//     const SQL = `
//     INSERT INTO wishlists (product_id, user_id, id) VALUES($1, $2, $3) RETURNING *
//   `;
//    response = await client.query(SQL, [ wishListItem.product_id, wishListItem.user_id, uuidv4()]);
//     return response.rows[0];
//   };

//   const deleteWishListItem = async(wishListItem)=> {
//     const SQL = `
//       DELETE from wishlists 
//       WHERE id = $1 AND user_id = $2
//     `;
//     await client.query(SQL, [wishListItem.id, wishListItem.user_id]);
//   };

//   const fetchWishListItem = async(userId)=> {
//     const SQL = `
//       SELECT * FROM wishlists
//       WHERE user_id = $1
//     `;
//     const response = await client.query(SQL, [ userId ]);
//     return response.rows;
//   };

//   module.exports = {
//     createWishListItem,
//     deleteWishListItem,
//     fetchWishListItem
//   }