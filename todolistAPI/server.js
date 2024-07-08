const express = require('express');
const app = express();
const cors = require('cors');
const port = 5002;

let toDoList = []; // 存储待办事项的数组

app.use(cors());
app.use(express.json()); // 解析 JSON 请求体

// 获取待办事项列表
app.get('/api/todos', (req, res) => {
    res.json(toDoList);
});

// 创建新待办事项
app.post('/api/todos', (req, res) => {
    const newToDo = req.body;
    newToDo.id = Date.now(); // 添加一个唯一的 ID
    toDoList.unshift(newToDo); // 将新待办事项添加到数组的开头
    res.status(201).json(newToDo);
});

// 更新待办事项
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedToDo = req.body;
    toDoList = toDoList.map(todo => todo.id === id ? { ...todo, ...updatedToDo } : todo);
    res.json(updatedToDo);
});

// 删除待办事项
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    toDoList = toDoList.filter(todo => todo.id !== id);
    res.status(204).send();
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const port = 5002;

// app.use(cors());
// app.use(express.json()); // 解析 JSON 请求体

// // 根路由
// app.get('/', (req, res) => {
//     res.send('Hello World');
//   });

  
// app.get('/api/test', (req, res) => {
//     res.json({ message: 'API is working on port 5002!' });
// });  

// // 获取用户列表
// app.get('/api/users', (req, res) => {
//   const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
//   res.json(users);
// });

// // 创建新用户
// app.post('/api/users', (req, res) => {
//   const newUser = req.body;
//   // 在这里处理新用户数据
//   res.status(201).json(newUser);
// });

// // 更新用户
// app.put('/api/users/:id', (req, res) => {
//   const userId = req.params.id;
//   const updatedUser = req.body;
//   // 在这里处理更新用户的逻辑，比如在数据库中更新用户信息
//   res.json({ id: userId, ...updatedUser });
// });

// // 删除用户
// app.delete('/api/users/:id', (req, res) => {
//   const userId = req.params.id;
//   // 在这里处理删除用户的逻辑，比如从数据库中删除用户
//   res.status(204).send(); // 204 No Content 表示成功处理了请求，但没有内容返回
// });

// // 启动服务器
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });