import { ADD_TODO, UPDATE_TODO, REMOVE_TODO } from "../types";

export const todoReducer = (state, { type, title, id }) => {
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            id: Date.now().toString(),
            complete: false,
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
