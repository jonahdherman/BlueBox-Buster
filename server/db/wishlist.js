const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

console.log("hello")
const fetchLineItems = async(userId)=> {
  const SQL = `
    SELECT line_items.* 
    FROM
    line_items
    JOIN wishlists
    ON wishlists.id = line_items.product_id
    JOIN users
    ON users.id = wishlists.user_id
    WHERE users.id = $1
    ORDER BY product_id
  `;
  
  
  const response = await client.query(SQL, [ userId ]);
  
  return response.rows;
};

const ensureList = async(lineItem)=> {
  let listId = lineItem.product_id;
  if(!listId){
    const SQL = `
      SELECT product_id 
      FROM line_items 
      WHERE id = $1 
    `;
    const response = await client.query(SQL, [lineItem.id]);
    listId = response.rows[0].product_id;
  }
  const SQL = `
    SELECT * 
    FROM wishlists
    WHERE id = $1 and is_list=true
  `;
  const response = await client.query(SQL, [listId]);
  if(!response.rows.length){
    throw Error("An order which has been placed can not be changed");
  }
};
const updateLineItem = async(lineItem)=> {
  await ensureList(lineItem);
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

const createLineItem = async(lineItem)=> {
  await ensureList(lineItem);
  const SQL = `
  INSERT INTO line_items (product_id, wishlist_id, id) VALUES($1, $2, $3) RETURNING *
`;
 response = await client.query(SQL, [ lineItem.product_id, lineItem.order_id, uuidv4()]);
  return response.rows[0];
};

const deleteLineItem = async(lineItem)=> {
  await ensureList(lineItem);
  const SQL = `
    DELETE from line_items
    WHERE id = $1
  `;
  await client.query(SQL, [lineItem.id]);
};

const updateWishList = async(order)=> {
  const SQL = `
    UPDATE wishlists SET is_list = $1 WHERE id = $2 RETURNING *
  `;
  const response = await client.query(SQL, [wishlist.is_list, wishlist.id]);
  return response.rows[0];
};

const fetchWishLists = async(userId)=> {
  const SQL = `
    SELECT * FROM wishlists
    WHERE user_id = $1
  `;
  let response = await client.query(SQL, [ userId ]);
  const list = response.rows.find(row => row.is_list);
  if(!list){
    await client.query(`
      INSERT INTO wishlists(is_list, id, user_id) VALUES(true, $1, $2)
      `,
      [uuidv4(), userId]
    ); 
    response = await client.query(SQL, [ userId ]);
    return response.rows;
    //return fetchOrders(userId);
  }
  return response.rows;
};

module.exports = {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateWishList,
  fetchWishLists
};
