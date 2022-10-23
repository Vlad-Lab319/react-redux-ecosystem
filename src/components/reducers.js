import {
  CREATE_TODO,
  MARK_COMPLETED,
  REMOVE_TODO,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from "./actions.js";

const initialState = { isLoading: false, data: [] }

export const todos = (
  state = initialState, 
  action,
  ) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      return {
        ...state,
        data: state.data.concat(todo),
      }

    }
    case REMOVE_TODO: {
      const { todo: todoToDelete } = payload;
      return {
        ...state,
        data: state.data.filter(todo => todo.id !== todoToDelete.id),
      }

    }
    case MARK_COMPLETED: {
      const { todo: todoToUpdate } = payload;
      return {
        ...state,
        data: state.data.map(todo => {
          if (todo.id === todoToUpdate.id) {
            return {
              ...todo,
              isCompleted: true,
            }
          }
          return todo;
        }),
      };
    }
    case LOAD_TODOS_IN_PROGRESS: {

      return {
        ...state,
        isLoading: true,
      }
    }
    case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      return {
        ...state,
        isLoading: false,
        data: todos,
      }
    }
    case LOAD_TODOS_FAILURE: {

      return {
        ...state,
        isLoading: false,
      }
    }
    default:
      return {
        ...state,
        isLoading: true,
      }
  };
}