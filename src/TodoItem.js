import React from "react";
import "./HelloWorld.css";

const TodoItem = ({ t, onUpdate, onDelete }) => {
  const handleUpdateClick = () => {
    onUpdate(t.id);
  };

  const handleDeleteClick = () => {
    onDelete(t.id);
  };

  return (
    <div className="singleTodoTask">
      <span className="toDoText">{t.inputToDo}</span>
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
