import React, { useState, useEffect } from "react";
import "./HelloWorld.css";
import TodoItem from "./TodoItem";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const HelloWorld = () => {
  const [inputToDo, setInputToDo] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [updateId, setUpdateId] = useState(0);

  useEffect(() => {
    fetch(`${apiUrl}`)
      .then(response => response.json())
      .then(data => setToDoList(data))
      .catch(error => console.error('獲取待辦事項失敗：', error));
  }, []);

  const handleInputChange = (e) => {
    setInputToDo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updateId) {
      try {
        const response = await fetch(`${apiUrl}/${updateId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inputtodo: inputToDo }),
        });
        const data = await response.json();
        setToDoList(toDoList.map(todo => todo.id === updateId ? { ...todo, inputtodo: inputToDo } : todo));
        setUpdateId(0);
        setInputToDo("");
      } catch (error) {
        console.error('更新待辦事項失敗：', error);
      }
    } else {
      const newToDo = { inputtodo: inputToDo };
      try {
        const response = await fetch(`${apiUrl}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newToDo),
        });
        const data = await response.json();
        setToDoList([...toDoList, data]);
        setInputToDo("");
      } catch (error) {
        console.error('新增待辦事項失敗：', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
      setToDoList(toDoList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('刪除待辦事項失敗：', error);
    }
  };

  const handleUpdate = (id) => {
    const updateToDo = toDoList.find((i) => i.id === id);
    setInputToDo(updateToDo.inputtodo);
    setUpdateId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>toDoList</h1>
        <form className="toDoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputToDo}
            onChange={handleInputChange}
          />
          <button type="submit">{updateId ? "更新" : "新增"}</button>
        </form>
        <ul className="allToDoList">
          {toDoList.map((todo) => (
            <li key={todo.id}>
              <TodoItem 
                todo={todo} 
                onUpdate={handleUpdate} 
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HelloWorld;
