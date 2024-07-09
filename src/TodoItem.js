import React from "react";
import "./HelloWorld.css";

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const handleUpdateClick = () => {
    onUpdate(todo.id);
  };

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  return (
    <div className="singleTodoTask">
      <span className="toDoText">{todo.inputtodo}</span>
      <button type="button" onClick={handleUpdateClick}>
        Update
      </button>
      <button type="button" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
