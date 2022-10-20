import React from "react";
import './TodoList.css';

import { connect } from 'react-redux';
import NewTodoForm from "./NewTodoForm";
import TodoListItem from './TodoListItem';
import { removeTodo, markTodoCompleted } from "./actions";

const TodoList = ({
  // todos = [{ text: "First todo" }],
  todos = [],
  onRemovePressed,
  onCompletePressed,
}) => (

  <div className="list-wrapper">
    <NewTodoForm />
    {todos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} onCompletePressed={onCompletePressed} />)}
  </div>
);

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
  onRemovePressed: text => dispatch(removeTodo(text)),
  onCompletePressed: text => dispatch(markTodoCompleted(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);