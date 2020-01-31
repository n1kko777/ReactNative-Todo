import React, { useState, useEffect, useContext, useCallback } from "react";
import { Layout } from "@ui-kitten/components";
import {
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  RefreshControl
} from "react-native";

import { AddTodo } from "../components/AddTodo";
import { TodoItem } from "../components/TodoItem";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";
import { AppError } from "../components/ui/AppError";

export const HomeScreen = () => {
  const {
    addTodo,
    todoList,
    removeTodo,
    fetchTodoList,
    loading,
    error
  } = useContext(TodoContext);

  const loadTodoList = useCallback(async () => await fetchTodoList(), [
    fetchTodoList
  ]);

  const handleRefreshing = () => loadTodoList();

  useEffect(() => {
    loadTodoList();
  }, []);

  let content = (
    <FlatList
      data={todoList}
      renderItem={({ item }) => <TodoItem todo={item} onRemove={removeTodo} />}
      keyExtractor={item => item.id}
      ListEmptyComponent={
        <Layout style={styles.empty}>
          <Image
            style={styles.emptyImg}
            source={require("../../assets/no-items.png")}
          />
        </Layout>
      }
      style={styles.flatList}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={handleRefreshing}
          tintColor="#fff"
        />
      }
    />
  );

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
      {error !== null ? (
        <AppError loadTodoList={loadTodoList} />
      ) : (
        <>
          <AddTodo onSubmit={addTodo} />
          {content}
        </>
      )}
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
