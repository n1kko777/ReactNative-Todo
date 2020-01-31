import React, { useReducer, useContext } from "react";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
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
import { ScreenContext } from "../screen/screenContext";
import { Alert } from "react-native";

import { Http } from "../../request";

export const TodoState = ({ children }) => {
  const { changeScreen } = useContext(ScreenContext);

  const initialState = {
    todoList: [],
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const setLoading = () => dispatch({ type: SET_LOADING });
  const clearLoading = () => dispatch({ type: CLEAR_LOADING });

  const setError = error => dispatch({ type: SET_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  const fetchTodoList = async () => {
    setLoading();
    clearError();

    try {
      const data = await Http.get(
        "https://tododatabase-5b1b3.firebaseio.com/todolist.json"
      );

      const todoList =
        data !== null
          ? Object.keys(data).map(key => ({
              ...data[key],
              id: key
            }))
          : [];

      dispatch({ type: FETCH_TODOLIST, todoList });
    } catch (error) {
      setError("Что-то пошло не так, попробукйте снова.");
      console.log("error :", error);
    } finally {
      clearLoading();
    }
  };

  const addTodo = async title => {
    setLoading();
    clearError();

    try {
      const {
        name
      } = await Http.post(
        "https://tododatabase-5b1b3.firebaseio.com/todolist.json",
        { title, complete: false }
      );

      dispatch({ type: ADD_TODO, title, id: name });
    } catch (error) {
      setError("Что-то пошло не так, попробукйте снова.");
      console.log("error :", error);
    } finally {
      clearLoading();
    }
  };

  const removeTodo = id => {
    Alert.alert(
      "Удаление задачи",
      `Вы уверены, что хотите удвлить "${
        state.todoList.find(todo => todo.id === id).title
      }"?`,
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        {
          text: "Удалить",
          onPress: async () => {
            changeScreen(null);
            setLoading();
            clearError();

            try {
              await Http.delete(
                `https://tododatabase-5b1b3.firebaseio.com/todolist/${id}.json`
              );

              dispatch({ type: REMOVE_TODO, id });
            } catch (error) {
              setError("Что-то пошло не так, попробукйте снова.");
              console.log("error :", error);
            } finally {
              clearLoading();
            }
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  const updateTodo = async (id, title) => {
    setLoading();
    clearError();

    try {
      await Http.patch(
        `https://tododatabase-5b1b3.firebaseio.com/todolist/${id}.json`,
        { title }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (error) {
      setError("Что-то пошло не так, попробукйте снова.");
      console.log("error :", error);
    } finally {
      clearLoading();
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todoList: state.todoList,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodoList
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
