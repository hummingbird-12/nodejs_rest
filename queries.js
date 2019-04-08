"use strict";

const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DB,
  password: process.env.PSQL_PASS,
  port: process.env.PSQL_PORT
});

// GET - all users
const getUsers = (request, response) => {
  pool.query(
    'SELECT * FROM users ORDER BY id ASC',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// GET - single user by id
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// POST - new user
const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201)
        .send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

// PUT - update existing user
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

// DELETE - remove user
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'DELETE FROM users WHERE id = $1',
    [id],
    (error, results) => {
      if(error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
