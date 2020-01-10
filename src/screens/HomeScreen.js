import React, { useState, useEffect, useContext } from "react";
import { Layout } from "@ui-kitten/components";
import { StyleSheet, FlatList, Image, Dimensions } from "react-native";

import { AddTodo } from "../components/AddTodo";
import { TodoItem } from "../components/TodoItem";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";

export const HomeScreen = () => {
  const { addTodo, todoList, removeTodo } = useContext(TodoContext);
  let content = (
    <FlatList
      data={todoList}
      renderItem={({ item }) => <TodoItem todo={item} onRemove={removeTodo} />}
      keyExtractor={item => item.id}
      style={styles.flatList}
    />
  );

  if (todoList.length === 0) {
    content = (
      <Layout style={styles.empty}>
        <Image
          style={styles.emptyImg}
          source={require("../../assets/no-items.png")}
        />
      </Layout>
    );
  }

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_DEFAULT * 2
  );

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get("window").width - THEME.PADDING_DEFAULT * 2;

      setDeviceWidth(width);
    };
    Dimensions.addEventListener("change", update);

    return () => Dimensions.removeEventListener("change", update);
  });

  return (
    <Layout
      style={{ marginHorizontal: THEME.PADDING_DEFAULT, width: deviceWidth }}
    >
      <AddTodo onSubmit={addTodo} />
      {content}
    </Layout>
  );
};

const styles = StyleSheet.create({
  flatList: { marginBottom: 200, height: "100%" },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 150
  },
  emptyImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});
