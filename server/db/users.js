const client = require('./client');
const { v4 } = require('uuid');
const bcrypt = require('bcrypt');
const uuidv4 = v4;

const fetchUsers = async()=> {
  const SQL = `
    SELECT id, created_at, username, is_admin, is_vip
    FROM users
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createUser = async(user)=> {
    if(!user.username.trim() || !user.password.trim()){
      throw Error('must have username and password');
    }
    user.password = await bcrypt.hash(user.password, 5);
    const SQL = `
      INSERT INTO users (id, username, password, is_admin, is_vip) VALUES($1, $2, $3, $4, $5) RETURNING *
    `;
    const response = await client.query(SQL, [ uuidv4(), user.username, user.password, user.is_admin || false, user.is_vip || false]);
    return response.rows[0];
  };

  const updateUser = async(user) => {
    const SQL = `
    UPDATE users 
    SET username=$1, is_vip=$2, is_admin=$3
    WHERE id=$4
    RETURNING *
  `;
  const response = await client.query(SQL, [ user.username, user.is_vip, user.is_admin, user.id ]);
  return response.rows[0];
  }

module.exports = {
  fetchUsers,
  createUser,
  updateUser
};