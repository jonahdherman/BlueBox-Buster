const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const createTag = async(tag)=> {
    const SQL = `
      INSERT INTO tags (id, name) 
      VALUES($1, $2) 
      RETURNING *
    `;
   
    const response = await client.query(SQL, [ uuidv4(), tag.name ]);
    return response.rows[0];
  };

  const createTag_line = async(tag_line)=> {
    const SQL = `
      INSERT INTO tag_lines (id, tag_id, product_id) 
      VALUES($1, $2, $3) 
      RETURNING *
    `;
   
    const response = await client.query(SQL, [ uuidv4(), tag_line.tag_id, tag_line.product_id ]);
    return response.rows[0];
  };


module.exports = {
  createTag,
  createTag_line
};
