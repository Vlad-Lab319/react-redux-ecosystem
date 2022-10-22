import React from "react";
import './TodoListItem.css';
import styled from 'styled-components';

const TodoContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
   
`;

const StaleTodoContainer = styled(TodoContainer)`
    border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 24 * 3600 * 1000 * 3)
    ? 'none'
    : '2px solid red'
  )}
`

const TodoListItem = ({ todo, onRemovePressed, onCompletePressed, }) => {
  
  const Container = todo.isCompleted ? TodoContainer : StaleTodoContainer;

  return (
  <Container createdAt={todo.createdAt}>

    <h3>{todo.text}</h3>
    <p>
      Created at:&nbsp;
      {(new Date(todo.createdAt)).toLocaleDateString()}
    </p>
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
  </Container>
)};

export default TodoListItem;