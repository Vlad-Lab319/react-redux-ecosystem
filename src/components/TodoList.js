import React, { useEffect } from "react";
import './TodoList.css';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NewTodoForm from "./NewTodoForm";
import TodoListItem from './TodoListItem';
import {
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos,
} from "./selectors";
import { loadTodos, deleteTodoRequest, updateTodoRequest } from "./thunks";

const TodoList = ({
  completedTodos,
  incompleteTodos,
  onRemovePressed,
  onCompletePressed,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = <div>Loading todos...</div>

  const content = (

    <div className="list-wrapper">
      <NewTodoForm />
      <h3>Incomplete:</h3>
      {incompleteTodos.map(todo =>
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletePressed={onCompletePressed}
        />)}
      <h3>Complete:</h3>
      {completedTodos.map(todo =>
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletePressed={onCompletePressed}
        />)}
    </div>
  );

  return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = dispatch => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: id => dispatch(deleteTodoRequest(id)),
  onCompletePressed: id => dispatch(updateTodoRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);