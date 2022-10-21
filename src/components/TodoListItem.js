import React from "react";
import './TodoListItem.css';

const TodoListItem = ({ todo, onRemovePressed, onCompletePressed, }) => (
  <div className="todo-item-container">
    <h3>{todo.text}</h3>
    <div className="button-container">
      {todo.isCompleted ? null : 
      <button
      className="button-completed"
      onClick={() => onCompletePressed(todo.id)}
      >
        Mark As Completed
      </button>
      }
      <button
        className="button-remove"
        onClick={() => onRemovePressed(todo.id)}
      >
        Remove
      </button>
    </div>
  </div>
);

export default TodoListItem;