const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const createBookmark = async(bookmark)=> {
  const SQL = `
  INSERT INTO bookmarks (product_id, user_id, id) VALUES($1, $2, $3) RETURNING *
`;
 const response = await client.query(SQL, [ bookmark.product_id, bookmark.user_id, uuidv4() ]);
  return response.rows[0];
};

const fetchBookmarks = async(userId)=> {
  const SQL = `
    SELECT * FROM bookmarks
    WHERE user_id = $1
  `;
  const response = await client.query(SQL, [ userId ]);
  return response.rows;
};

module.exports = {
  createBookmark,
  fetchBookmarks
};
