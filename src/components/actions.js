export const CREATE_TODO = 'CREATE_TODO';
export const createTodo = text => ({
  type: CREATE_TODO,
  payload: {text},
});

export const REMOVE_TODO = 'REMOVE_TODO';
export const removeTodo = text => ({
  type: REMOVE_TODO,
  payload: {text},
});

export const MARK_COMPLETED = 'MARK_COMPLETED';
export const markTodoCompleted = text => ({
  type: MARK_COMPLETED,
  payload: {text},
});