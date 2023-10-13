const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchTags = async()=> {
    const SQL = `
      SELECT *
      FROM tags
    `;
    const response = await client.query(SQL);
    return response.rows;
  };

  const fetchTag_lines = async()=> {
    const SQL = `
      SELECT *
      FROM tag_lines
    `;
    const response = await client.query(SQL);
    return response.rows;
  };

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
  createTag_line,
  fetchTags,
  fetchTag_lines
};
