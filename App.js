import React, { useState } from "react";

import {
  ApplicationProvider,
  IconRegistry,
  Layout
} from "@ui-kitten/components";
import { mapping, dark as darkTheme } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { HomeScreen } from "./src/screens/HomeScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

import { Navbar } from "./src/components/Navbar";

import { StyleSheet, Alert, Dimensions } from "react-native";
import { THEME } from "./src/theme";

const App = () => {
  const [todoId, setTodoId] = useState(null);
  const [todoList, setTodoList] = useState([]);

  const addTodo = title => {
    setTodoList(prevTodoList => [
      ...prevTodoList,
      {
        id: Date.now().toString(),
        complete: false,
        title
      }
    ]);
  };

  const removeTodo = id => {
    Alert.alert(
      "Удаление задачи",
      `Вы уверены, что хотите удвлить "${
        todoList.filter(todo => todo.id === id)[0].title
      }"?`,
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        {
          text: "Удалить",
          onPress: () => {
            setTodoId(null);
            setTodoList(prevTodoList =>
              prevTodoList.filter(todo => todo.id !== id)
            );
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  const editTodo = todo => {
    setTodoList(prev =>
      prev.map(todoElem => {
        if (todoElem.id === todo.id) {
          todoElem.title = todo.title;
        }
        return todoElem;
      })
    );
    setTodoId(null);
  };

  let content = (
    <HomeScreen
      todoList={todoList}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  );

  if (todoId) {
    content = (
      <TodoScreen
        onRemove={removeTodo}
        todo={todoList.filter(todo => todo.id === todoId)[0]}
        onSubmit={editTodo}
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
            backToHome={() => setTodoId(null)}
            isHome={todoId}
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
export default App;
