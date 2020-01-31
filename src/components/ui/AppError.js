import React, { useContext, useEffect } from "react";
import { Layout, Icon, Button } from "@ui-kitten/components";
import { StyleSheet, Text } from "react-native";
import { THEME } from "../../theme";
import { TodoContext } from "../../context/todo/todoContext";

export const AppError = ({loadTodoList}) => {
  const { error } = useContext(TodoContext);
  
  return (
    <Layout style={styles.center}>
      <Icon name="alert-triangle-outline" width={64} height={64} fill="#fff" />
      <Text style={styles.errorText}>{error}</Text>

      <Button onPress={loadTodoList}>Повторить</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  center: {
    flexDirection: "column",
    alignItems: "center",
    alignItems: "center",
    marginTop: THEME.PADDING_DEFAULT
  },
  errorText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20
  }
});
