const { Pool } = require('pg');

// 配置資料庫連接
const pool = new Pool({
  user: 'postgres', // 資料庫用戶名
  host: 'localhost', // Docker 服務器名稱
  database: 'todos', // 資料庫名稱
  password: '920309', // 資料庫密碼
  port: 5432, // 資料庫埠號（默認為 5432）
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
