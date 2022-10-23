import React, { useState } from "react";
import { connect } from 'react-redux';
import { getTodos } from "./selectors.js";
import { addTodoRequest } from "./thunks.js";
import './NewTodoForm.css';

const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="new-todo-form">
      <input
        type="text"
        className="new-todo-input"
        placeholder="Type your new todo here..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <button
        className="new-todo-button"
        onClick={() => {
          const isDuplicateText = todos.some(todo => todo.text === inputValue)
          if (!isDuplicateText) {
            onCreatePressed(inputValue);
            setInputValue('');
          }
        }}
      >
        Create Todo
      </button>
    </div>
  )
};

const mapStateToProps = state => ({
  todos: getTodos(state),
});
const mapDispatchToProps = dispatch => ({
  onCreatePressed: text => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);