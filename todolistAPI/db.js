const { Pool } = require('pg');
require('dotenv').config();

// 配置資料庫連接
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  max: 5
});

// 測試連接
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('資料庫連接錯誤：', err);
  } else {
    console.log('資料庫連接成功：', res.rows);
  }
});

module.exports = pool;
