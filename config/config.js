const fs = require('fs');

module.exports = {
  development: {
    username: process.env.DATA_USER,
    password: process.env.DATA_PASS,
    database: process.env.DATA_NAME,
    host: process.env.DATA_HOST,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DATA_USER,
    password: process.env.DATA_PASS,
    database: process.env.DATA_NAME,
    host: process.env.DATA_HOST,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DATA_USER,
    password: process.env.DATA_PASS,
    database: process.env.DATA_NAME,
    host: process.env.DATA_HOST,
    dialect: 'postgres'
  }
}
