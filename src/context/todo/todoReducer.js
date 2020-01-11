import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  FETCH_TODOLIST,
  SET_LOADING,
  CLEAR_LOADING,
  SET_ERROR,
  CLEAR_ERROR
} from "../types";

export const todoReducer = (state, { type, title, id, error, todoList }) => {
  switch (type) {
    case FETCH_TODOLIST:
      return {
        ...state,
        todoList
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false
      };
    case SET_ERROR:
      return {
        ...state,
        error
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case ADD_TODO:
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            complete: false,
            id,
            title
          }
        ]
      };
    case UPDATE_TODO:
      return {
        ...state,
        todoList: state.todoList.map(todoElem => {
          if (todoElem.id === id) {
            todoElem.title = title;
          }
          return todoElem;
        })
      };
    case REMOVE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== id)
      };
    default:
      return state;
  }
};
