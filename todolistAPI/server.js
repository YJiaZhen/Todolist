const express = require('express');
const app = express();
const pool = require('./db'); // 引入 db.js 文件
const cors = require('cors');

const port = 5002;

app.use(cors());
app.use(express.json()); // 解析 JSON 

// 獲取所有代辦事項
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await pool.query('SELECT * FROM todos ORDER BY id DESC');
        res.json(todos.rows);
    } catch (err) {
        console.error('獲取代辦事項失敗:', err.message);
        res.status(500).json({ error: '獲取代辦事項失敗' });
    }
});

// 创建新待办事项
app.post('/api/todos', async (req, res) => {
    try {
        const { inputtodo } = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todos (inputtodo) VALUES($1) RETURNING *',
            [inputtodo]
        );
        res.status(201).json(newTodo.rows[0]);
    } catch (err) {
        console.error('创建新待办事项失败:', err.message);
        res.status(500).json({ error: '创建新待办事项失败' });
    }
});

// 更新待办事项
app.put('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { inputtodo } = req.body;
        const updatedTodo = await pool.query(
            'UPDATE todos SET inputtodo = $1 WHERE id = $2 RETURNING *',
            [inputtodo, id]
        );
        res.json(updatedTodo.rows[0]);
    } catch (err) {
        console.error('更新待办事项失败:', err.message);
        res.status(500).json({ error: '更新待办事项失败' });
    }
});

// 删除待办事项
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        console.error('删除待办事项失败:', err.message);
        res.status(500).json({ error: '删除待办事项失败' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
