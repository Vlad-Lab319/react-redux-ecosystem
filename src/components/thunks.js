import {
  createTodo,
  removeTodo,
  markTodoCompleted,
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure
} from "./actions";

export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch('http://localhost:8000/api/todos/');
    const todos = await response.json();
    dispatch(loadTodosSuccess(todos));

  } catch (err) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(err));
  }
}

export const addTodoRequest = text => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch('http://localhost:8000/api/todos/', {
      headers: {
        'Content-Type': 'application/json',

      },
      method: 'post',
      body,
    });
    const todo = await response.json();
    dispatch(createTodo(todo));

  } catch (err) {
    dispatch(displayAlert(err));
  }
}

export const deleteTodoRequest = id => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8000/api/todos/${id}`, {
      method: 'delete',
    });
    const removedTodo = await response.json();
    dispatch(removeTodo(removedTodo));
  } catch (err) {
    dispatch(displayAlert(err));
  }
}

export const updateTodoRequest = id => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8000/api/todos/${id}/completed`, {
      method: 'put',
    });
    const updatedTodo = await response.json();
    dispatch(markTodoCompleted(updatedTodo));

  } catch (err) {
    displayAlert(displayAlert(err));
  }
}

export const displayAlert = text => () => {
  alert(text);
};