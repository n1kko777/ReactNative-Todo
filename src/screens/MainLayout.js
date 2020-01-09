import React, { useContext } from "react";

import {
  ApplicationProvider,
  IconRegistry,
  Layout
} from "@ui-kitten/components";
import { mapping, dark as darkTheme } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { HomeScreen } from "./HomeScreen";
import { TodoScreen } from "./TodoScreen";

import { Navbar } from "../components/Navbar";

import { StyleSheet, Alert, Dimensions } from "react-native";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

export const MainLayout = () => {
  const { todoList, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
  const { todoID, changeScreen } = useContext(ScreenContext);

  // const removeTodo = id => {
  //   Alert.alert(
  //     "Удаление задачи",
  //     `Вы уверены, что хотите удвлить "${
  //       todoList.filter(todo => todo.id === id)[0].title
  //     }"?`,
  //     [
  //       {
  //         text: "Отмена",
  //         style: "cancel"
  //       },
  //       {
  //         text: "Удалить",
  //         onPress: () => {
  //           changeScreen(null);
  //           setTodoList(prevTodoList =>
  //             prevTodoList.filter(todo => todo.id !== id)
  //           );
  //         },
  //         style: "destructive"
  //       }
  //     ],
  //     { cancelable: false }
  //   );
  // };


  let content = (
    <HomeScreen
      todoList={todoList}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={changeScreen}
    />
  );

  if (todoID) {
    content = (
      <TodoScreen
        onRemove={removeTodo}
        todo={todoList.filter(todo => todo.id === todoID)[0]}
        onSubmit={updateTodo}
      />
    );
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={darkTheme}>
        <Layout style={styles.container}>
          <Navbar
            title="Todo App"
            backToHome={() => changeScreen(null)}
            isHome={todoID}
          />
          <Layout style={{ width: Dimensions.get("window").width - 40 }}>
            {content}
          </Layout>
        </Layout>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.DEFAULT_COLOR
  }
});
